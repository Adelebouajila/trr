/**
 * French Translation API Endpoints
 * Handles PHP file parsing and French page generation
 */

const fs = require('fs').promises;
const path = require('path');

// API endpoint: GET /api/get-php-files
async function getPhpFiles(req, res) {
  try {
    if (!req.user || (req.user.role !== 'admin' && req.user.is_admin !== true)) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const prodpageDir = path.join(__dirname, '../prodpage');
    console.log('📁 Scanning directory for PHP files:', prodpageDir);

    const files = await fs.readdir(prodpageDir);
    const phpFiles = files.filter(file => {
      const filePath = path.join(prodpageDir, file);
      try {
        const stat = require('fs').statSync(filePath);
        return stat.isFile() && file.endsWith('.php');
      } catch (error) {
        return false;
      }
    });

    console.log(`✅ Found ${phpFiles.length} PHP files:`, phpFiles);
    res.json({ files: phpFiles });
  } catch (error) {
    console.error('❌ Error reading PHP files:', error);
    res.status(500).json({ error: 'Failed to read PHP files: ' + error.message });
  }
}

// API endpoint: POST /api/parse-php-content
async function parsePhpContent(req, res) {
  try {
    if (!req.user || (req.user.role !== 'admin' && req.user.is_admin !== true)) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { filename } = req.body;
    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    const filePath = path.join(__dirname, '../prodpage', filename);
    console.log('📄 Parsing PHP file:', filePath);

    const content = await fs.readFile(filePath, 'utf-8');
    
    // Extract translatable sections
    const extractedContent = {
      title: extractTourTitle(content),
      aboutTour: extractAboutTour(content),
      highlights: extractHighlights(content),
      included: extractIncluded(content),
      notIncluded: extractNotIncluded(content),
      notSuitableFor: extractNotSuitableFor(content),
      detailedDescription: extractDetailedDescription(content),
      faq: extractFAQ(content)
    };

    console.log('✅ Content extracted successfully');
    res.json(extractedContent);
  } catch (error) {
    console.error('❌ Error parsing PHP content:', error);
    res.status(500).json({ error: 'Failed to parse PHP content: ' + error.message });
  }
}

// API endpoint: POST /api/generate-french-page
async function generateFrenchPage(req, res) {
  try {
    if (!req.user || (req.user.role !== 'admin' && req.user.is_admin !== true)) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { 
      php_file, 
      title_fr, 
      about_tour_fr, 
      highlights_fr, 
      included_fr, 
      not_included_fr, 
      not_suitable_for_fr, 
      detailed_description_fr, 
      faq_fr,
      custom_filename 
    } = req.body;

    if (!php_file) {
      return res.status(400).json({ error: 'PHP file selection is required' });
    }

    // Read original PHP file
    const originalFilePath = path.join(__dirname, '../prodpage', php_file);
    const originalContent = await fs.readFile(originalFilePath, 'utf-8');

    // Create French version
    let frenchContent = replaceSections(originalContent, {
      title: title_fr,
      aboutTour: about_tour_fr,
      highlights: highlights_fr,
      included: included_fr,
      notIncluded: not_included_fr,
      notSuitableFor: not_suitable_for_fr,
      detailedDescription: detailed_description_fr,
      faq: faq_fr
    });

    // Update language attributes
    frenchContent = frenchContent.replace(/lang="en"/g, 'lang="fr"');
    
    // Apply common title translations
    frenchContent = translateCommonTitles(frenchContent);
    
    // Apply navigation translations
    frenchContent = translateNavigationToFrench(frenchContent);

    // Determine output filename
    const outputFilename = custom_filename || php_file;
    const sanitizedFilename = outputFilename.replace(/[^a-zA-Z0-9\-_.]/g, '-');
    const finalFilename = sanitizedFilename.endsWith('.php') ? sanitizedFilename : sanitizedFilename + '.php';

    // Ensure fr directory exists
    const frDir = path.join(__dirname, '../prodpage/fr');
    try {
      await fs.access(frDir);
    } catch {
      await fs.mkdir(frDir, { recursive: true });
      console.log('📁 Created fr directory');
    }

    // Save French file
    const frenchFilePath = path.join(frDir, finalFilename);
    await fs.writeFile(frenchFilePath, frenchContent, 'utf-8');

    console.log('✅ French page generated successfully:', finalFilename);
    res.json({ 
      message: 'French page generated successfully',
      filename: finalFilename,
      path: `prodpage/fr/${finalFilename}`
    });
  } catch (error) {
    console.error('❌ Error generating French page:', error);
    res.status(500).json({ error: 'Failed to generate French page: ' + error.message });
  }
}

// Content extraction functions
function extractTourTitle(content) {
  // Try multiple patterns for title extraction
  const patterns = [
    /<title[^>]*>(.*?)<\/title>/i,
    /<h1[^>]*>(.*?)<\/h1>/i,
    /class="tour-title"[^>]*>(.*?)</i
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      return match[1].replace(/<[^>]*>/g, '').trim();
    }
  }
  return 'Tour Title Not Found';
}

function extractAboutTour(content) {
  const patterns = [
    /<h2[^>]*>About This Tour<\/h2>\s*<p[^>]*>(.*?)<\/p>/is,
    /<h3[^>]*>About This Tour<\/h3>\s*<p[^>]*>(.*?)<\/p>/is,
    /About This Tour[^<]*<\/[^>]+>\s*<p[^>]*>(.*?)<\/p>/is
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      return match[1].replace(/<[^>]*>/g, '').trim();
    }
  }
  return '';
}

function extractHighlights(content) {
  const patterns = [
    /<h2[^>]*>Tour Highlights<\/h2>\s*<ul[^>]*>(.*?)<\/ul>/is,
    /<h3[^>]*>Highlights<\/h3>\s*<ul[^>]*>(.*?)<\/ul>/is,
    /Tour Highlights[^<]*<\/[^>]+>\s*<ul[^>]*>(.*?)<\/ul>/is
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      const listItems = match[1].match(/<li[^>]*>(.*?)<\/li>/gis);
      if (listItems) {
        return listItems.map(item => 
          item.replace(/<li[^>]*>|<\/li>/gi, '').replace(/<[^>]*>/g, '').trim()
        ).join('\n');
      }
    }
  }
  return '';
}

function extractIncluded(content) {
  const patterns = [
    /<h2[^>]*>What's Included<\/h2>\s*<ul[^>]*>(.*?)<\/ul>/is,
    /<h3[^>]*>Included<\/h3>\s*<ul[^>]*>(.*?)<\/ul>/is,
    /What's Included[^<]*<\/[^>]+>\s*<ul[^>]*>(.*?)<\/ul>/is
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      const listItems = match[1].match(/<li[^>]*>(.*?)<\/li>/gis);
      if (listItems) {
        return listItems.map(item => 
          item.replace(/<li[^>]*>|<\/li>/gi, '').replace(/<[^>]*>/g, '').trim()
        ).join('\n');
      }
    }
  }
  return '';
}

function extractNotIncluded(content) {
  const patterns = [
    /<h2[^>]*>What's Not Included<\/h2>\s*<ul[^>]*>(.*?)<\/ul>/is,
    /<h3[^>]*>Not Included<\/h3>\s*<ul[^>]*>(.*?)<\/ul>/is,
    /What's Not Included[^<]*<\/[^>]+>\s*<ul[^>]*>(.*?)<\/ul>/is
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      const listItems = match[1].match(/<li[^>]*>(.*?)<\/li>/gis);
      if (listItems) {
        return listItems.map(item => 
          item.replace(/<li[^>]*>|<\/li>/gi, '').replace(/<[^>]*>/g, '').trim()
        ).join('\n');
      }
    }
  }
  return '';
}

function extractNotSuitableFor(content) {
  const patterns = [
    /<h2[^>]*>Not Suitable For<\/h2>\s*<ul[^>]*>(.*?)<\/ul>/is,
    /<h3[^>]*>Not Suitable For<\/h3>\s*<ul[^>]*>(.*?)<\/ul>/is,
    /Not Suitable For[^<]*<\/[^>]+>\s*<ul[^>]*>(.*?)<\/ul>/is,
    /<div[^>]*class="[^"]*warning[^"]*"[^>]*>(.*?)<\/div>/is
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      const listItems = match[1].match(/<li[^>]*>(.*?)<\/li>/gis);
      if (listItems) {
        return listItems.map(item => 
          item.replace(/<li[^>]*>|<\/li>/gi, '').replace(/<[^>]*>/g, '').trim()
        ).join('\n');
      } else {
        return match[1].replace(/<[^>]*>/g, '').trim();
      }
    }
  }
  return '';
}

function extractDetailedDescription(content) {
  const patterns = [
    /<h2[^>]*>Detailed Description<\/h2>\s*<div[^>]*>(.*?)<\/div>/is,
    /<h3[^>]*>Description<\/h3>\s*<p[^>]*>(.*?)<\/p>/is,
    /<div[^>]*class="[^"]*description[^"]*"[^>]*>(.*?)<\/div>/is
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      return match[1].replace(/<[^>]*>/g, '').trim();
    }
  }
  return '';
}

function extractFAQ(content) {
  const faqItems = [];
  const patterns = [
    /<h2[^>]*>FAQ<\/h2>(.*?)(?=<h2|$)/is,
    /<h3[^>]*>Frequently Asked Questions<\/h3>(.*?)(?=<h3|$)/is
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) {
      const faqSection = match[1];
      const qaPatterns = [
        /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gis,
        /<strong[^>]*>(.*?)<\/strong>\s*<p[^>]*>(.*?)<\/p>/gis
      ];

      for (const qaPattern of qaPatterns) {
        let qaMatch;
        while ((qaMatch = qaPattern.exec(faqSection)) !== null) {
          faqItems.push({
            question: qaMatch[1].replace(/<[^>]*>/g, '').trim(),
            answer: qaMatch[2].replace(/<[^>]*>/g, '').trim()
          });
        }
      }
    }
  }
  
  return faqItems;
}

// Content replacement function
function replaceSections(content, frenchData) {
  let updatedContent = content;

  // Replace title
  if (frenchData.title) {
    updatedContent = updatedContent.replace(
      /<title[^>]*>.*?<\/title>/i,
      `<title>${frenchData.title}</title>`
    );
    updatedContent = updatedContent.replace(
      /<h1[^>]*>.*?<\/h1>/i,
      `<h1>${frenchData.title}</h1>`
    );
  }

  // Replace about section
  if (frenchData.aboutTour) {
    const aboutPatterns = [
      /<h2[^>]*>About This Tour<\/h2>\s*<p[^>]*>.*?<\/p>/is,
      /<h3[^>]*>About This Tour<\/h3>\s*<p[^>]*>.*?<\/p>/is
    ];
    
    for (const pattern of aboutPatterns) {
      if (updatedContent.match(pattern)) {
        updatedContent = updatedContent.replace(
          pattern,
          `<h2>À propos de cette tour</h2>\n<p>${frenchData.aboutTour}</p>`
        );
        break;
      }
    }
  }

  // Replace highlights
  if (frenchData.highlights) {
    const highlightsList = frenchData.highlights.split('\n')
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join('\n');

    const highlightPatterns = [
      /<h2[^>]*>Tour Highlights<\/h2>\s*<ul[^>]*>.*?<\/ul>/is,
      /<h3[^>]*>Highlights<\/h3>\s*<ul[^>]*>.*?<\/ul>/is
    ];

    for (const pattern of highlightPatterns) {
      if (updatedContent.match(pattern)) {
        updatedContent = updatedContent.replace(
          pattern,
          `<h2>Points forts de la tour</h2>\n<ul>\n${highlightsList}\n</ul>`
        );
        break;
      }
    }
  }

  // Replace included items
  if (frenchData.included) {
    const includedList = frenchData.included.split('\n')
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join('\n');

    const includedPatterns = [
      /<h2[^>]*>What's Included<\/h2>\s*<ul[^>]*>.*?<\/ul>/is,
      /<h3[^>]*>Included<\/h3>\s*<ul[^>]*>.*?<\/ul>/is
    ];

    for (const pattern of includedPatterns) {
      if (updatedContent.match(pattern)) {
        updatedContent = updatedContent.replace(
          pattern,
          `<h2>Ce qui est inclus</h2>\n<ul>\n${includedList}\n</ul>`
        );
        break;
      }
    }
  }

  // Replace not included items
  if (frenchData.notIncluded) {
    const notIncludedList = frenchData.notIncluded.split('\n')
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join('\n');

    const notIncludedPatterns = [
      /<h2[^>]*>What's Not Included<\/h2>\s*<ul[^>]*>.*?<\/ul>/is,
      /<h3[^>]*>Not Included<\/h3>\s*<ul[^>]*>.*?<\/ul>/is
    ];

    for (const pattern of notIncludedPatterns) {
      if (updatedContent.match(pattern)) {
        updatedContent = updatedContent.replace(
          pattern,
          `<h2>Ce qui n'est pas inclus</h2>\n<ul>\n${notIncludedList}\n</ul>`
        );
        break;
      }
    }
  }

  // Replace not suitable for
  if (frenchData.notSuitableFor) {
    const notSuitableList = frenchData.notSuitableFor.split('\n')
      .filter(item => item.trim())
      .map(item => `<li>${item.trim()}</li>`)
      .join('\n');

    const notSuitablePatterns = [
      /<h2[^>]*>Not Suitable For<\/h2>\s*<ul[^>]*>.*?<\/ul>/is,
      /<h3[^>]*>Not Suitable For<\/h3>\s*<ul[^>]*>.*?<\/ul>/is
    ];

    for (const pattern of notSuitablePatterns) {
      if (updatedContent.match(pattern)) {
        updatedContent = updatedContent.replace(
          pattern,
          `<h2>Ne convient pas pour</h2>\n<ul>\n${notSuitableList}\n</ul>`
        );
        break;
      }
    }
  }

  // Replace detailed description
  if (frenchData.detailedDescription) {
    const detailedPatterns = [
      /<h2[^>]*>Detailed Description<\/h2>\s*<div[^>]*>.*?<\/div>/is,
      /<h3[^>]*>Description<\/h3>\s*<p[^>]*>.*?<\/p>/is
    ];

    for (const pattern of detailedPatterns) {
      if (updatedContent.match(pattern)) {
        updatedContent = updatedContent.replace(
          pattern,
          `<h2>Description détaillée</h2>\n<div>${frenchData.detailedDescription}</div>`
        );
        break;
      }
    }
  }

  // Replace FAQ
  if (frenchData.faq && Array.isArray(frenchData.faq) && frenchData.faq.length > 0) {
    const faqHtml = frenchData.faq.map(item => 
      `<h3>${item.question}</h3>\n<p>${item.answer}</p>`
    ).join('\n');

    const faqPatterns = [
      /<h2[^>]*>FAQ<\/h2>.*?(?=<h2|$)/is,
      /<h3[^>]*>Frequently Asked Questions<\/h3>.*?(?=<h3|$)/is
    ];

    for (const pattern of faqPatterns) {
      if (updatedContent.match(pattern)) {
        updatedContent = updatedContent.replace(
          pattern,
          `<h2>FAQ</h2>\n${faqHtml}`
        );
        break;
      }
    }
  }

  return updatedContent;
}

// Common title translation function
function translateCommonTitles(content) {
  const translations = {
    'About This Tour': 'À propos de cette tour',
    'Tour Highlights': 'Points forts de la tour',
    "What's Included": 'Ce qui est inclus',
    "What's Not Included": "Ce qui n'est pas inclus",
    'Not Suitable For': 'Ne convient pas pour',
    'Detailed Description': 'Description détaillée',
    'Book Now': 'Réserver maintenant',
    'Contact Us': 'Nous contacter',
    'Get Quote': 'Obtenir un devis',
    'Duration': 'Durée',
    'Group Size': 'Taille du groupe',
    'Language': 'Langue',
    'Pickup': 'Prise en charge',
    'Reviews': 'Avis',
    'Gallery': 'Galerie',
    'Itinerary': 'Itinéraire',
    'Price': 'Prix',
    'Availability': 'Disponibilité'
  };

  let translatedContent = content;
  
  for (const [english, french] of Object.entries(translations)) {
    // Replace in headings
    translatedContent = translatedContent.replace(
      new RegExp(`<h([1-6])[^>]*>${english}</h[1-6]>`, 'gi'),
      `<h$1>${french}</h$1>`
    );
    
    // Replace in buttons
    translatedContent = translatedContent.replace(
      new RegExp(`<button[^>]*>${english}</button>`, 'gi'),
      `<button>${french}</button>`
    );
    
    // Replace in links
    translatedContent = translatedContent.replace(
      new RegExp(`<a[^>]*>${english}</a>`, 'gi'),
      `<a>${french}</a>`
    );
  }

  return translatedContent;
}

// Navigation translation function
function translateNavigationToFrench(content) {
  const navTranslations = {
    'Home': 'Accueil',
    'About Us': 'À propos',
    'Tours': 'Tours',
    'Activities': 'Activités',
    'Contact': 'Contact',
    'Gallery': 'Galerie',
    'Blog': 'Blog'
  };

  let translatedContent = content;
  
  for (const [english, french] of Object.entries(navTranslations)) {
    // Replace navigation menu items
    translatedContent = translatedContent.replace(
      new RegExp(`<a[^>]*>${english}</a>`, 'gi'),
      `<a>${french}</a>`
    );
    
    translatedContent = translatedContent.replace(
      new RegExp(`<li[^>]*><a[^>]*>${english}</a></li>`, 'gi'),
      `<li><a>${french}</a></li>`
    );
  }

  // Remove /fr/ prefixes from URLs as requested
  translatedContent = removeFrPrefixesFromUrls(translatedContent);

  return translatedContent;
}

function removeFrPrefixesFromUrls(content) {
  // Remove /fr/ from href attributes
  return content.replace(/href="\/fr\//g, 'href="/');
}

module.exports = {
  getPhpFiles,
  parsePhpContent,
  generateFrenchPage
};