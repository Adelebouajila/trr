<?php
/**
 * Template Name: DTS - Modern Hp eng
 * Description: A modern, responsive homepage template for Depart Travel Services. 
 * This single file can replace your existing homepage.
 */

// Make sure we get the correct language from URL
function get_current_language() {
    $url = $_SERVER['REQUEST_URI'];
    if (strpos($url, '/en/') !== false || strpos($url, '/en') === 0) {
        return 'en';
    } elseif (strpos($url, '/it/') !== false || strpos($url, '/it') === 0) {
        return 'it';
    } elseif (strpos($url, '/de/') !== false || strpos($url, '/de') === 0) {
        return 'de';
    } else {
        return 'fr';
    }
}

// Set translations based on current language
function get_translations() {
    $lang = get_current_language();

    $translations = [
        'fr' => [
            'accueil' => 'Accueil',
            'a_propos' => 'A Propos',
            'activites' => 'Activités',
            'excursion' => 'Excursion',
            'circuits' => 'Circuits',
            'blog' => 'Blog',
            'contact' => 'Contact',
            'main_title' => 'DEPART TRAVEL SERVICES',
            'subtitle' => 'Vous arrivez clients, vous repartez AMIS',
            'description_p1' => 'Depart Travel Services va au-delà d\'une simple agence de voyages. Nous sommes la passerelle vers des expériences de voyage inoubliables. C\'est votre billet pour une aventure enrichissante, où chaque voyage est une expérience unique, chaque instant une découverte, et chaque destination une porte ouverte vers des souvenirs inoubliables.',
            'description_h1' => 'L\'expertise à Djerba',
            'description_p2' => 'Implantée à Djerba, Depart Travel Services se distingue par la qualité de son équipe expérimentée, prête à vous offrir une gamme complète de services. Si vous êtes en quête d\'une approche sérieuse, d\'un savoir-faire inégalé, d\'une expertise professionnelle, ainsi que d\'un service impeccable, ne cherchez pas plus loin, ne cherchez pas ailleurs !',
            'description_h2' => 'Des Vacances Inoubliables',
            'description_p3' => 'Avant même votre arrivée, nous vous aiderons à préparer vos vacances de manière exceptionnelle et de tirer le meilleur parti de votre séjour. Une fois ici, nous vous guiderons vers les coins secrets de notre magnifique pays, révélant des trésors cachés tels que le désert, les villages berbères pittoresques et les sites que la plupart des visiteurs ne découvrent jamais en se contentant de la plage ou de la piscine de leurs hôtels. Notre mission consiste à bien plus qu\'à simplement vous emmener d\'un endroit à l\'autre.',
            'description_h3' => 'L\'aventure avec Depart Travel Services',
            'description_p4' => 'En choisissant de partir avec nous, préparez vous à une aventure incomparable, un dépaysement total, une fusion parfaite entre farniente, détente et découvertes authentiques au cœur de la vie locale. Nous ne vous contentons pas de vous emmener au cœur de la vie quotidienne des habitants locaux, mais nous vous plongeons véritablement dans une dimension nouvelle, réelle et authentique.',
            'description_h4' => 'Nos Services',
            'description_p5' => 'Dans cet espace, nous vous proposons une panoplie de services, notamment :',
            'services_list' => [
                'Réservation d\'hôtels à travers la Tunisie.',
                'Excursions à Djerba.',
                'Création de circuits sur mesure en Tunisie.',
                'Découverte d\'activités et de promenades uniques à Djerba.',
                'Transferts dans tout le territoire tunisien.',
                'Accès à notre guide de voyage expert pour découvrir en détail tout ce que vous souhaitez savoir sur notre pays.'
            ],
            'feature_1_title' => 'Expérience Locale',
            'feature_1_desc' => 'Passez par les locaux et appréciez cette expérience authentique loin du tourisme de masse et des sentiers battus.',
            'feature_2_title' => 'Sur-mesure',
            'feature_2_desc' => 'Passez par les locaux et appréciez cette expérience authentique loin du tourisme de masse et des sentiers battus.',
            'feature_3_title' => 'Disponibilité',
            'feature_3_desc' => 'Avec nous, il n\'y a jamais de moments où l\'on ne peut pas déranger. Nous sommes toujours à votre disposition.',
            'feature_4_title' => 'Rapidité',
            'feature_4_desc' => 'On n\'est jamais à l\'abri d\'un incident. C\'est la rapidité et l\'efficacité des interventions qui font la différence.',
            'adventures_title' => 'Nos Aventures',
            'activity_title' => 'Activités à Djerba',
            'activity_desc' => 'Des activités captivantes, des aventures remplies d\'adrénaline vous attendent',
            'activity_btn' => 'Voir la liste des activités',
            'excursion_title' => 'Excursions depuis Djerba',
            'excursion_desc' => 'Partez à l\'aventure avec nos excursions excitantes, et vivez des moments inoubliables.',
            'excursion_btn' => 'Voir la liste des excursions',
            'circuit_title' => 'Circuits sur-mesure',
            'circuit_desc' => 'Explorez les trésors cachés de la Tunisie avec nos passionnants circuits.',
            'circuit_btn' => 'Voir la liste des circuits',
            'why_title' => 'Pourquoi Depart Travel Services',
            'why_1_title' => 'SERVICES 100% PERSONNALISÉS',
            'why_1_desc' => 'Nous offrons des services entièrement personnalisés avec l\'expertise de nos spécialistes du voyage.',
            'why_2_title' => 'LARGE VARIÉTÉ DE DESTINATIONS',
            'why_2_desc' => 'Avec nous, vous trouverez une destination parfaite parmi des dizaines d\'options disponibles',
            'why_3_title' => 'SERVICE HAUTEMENT QUALIFIÉ',
            'why_3_desc' => 'Notre haut niveau de service est officiellement reconnu par des milliers de clients',
            'why_4_title' => 'ASSISTANCE 24/7',
            'why_4_desc' => 'Nos agents de voyage sont toujours là pour vous soutenir pendant votre voyage.',
            'why_5_title' => 'PROGRAMMES SÉLECTIONNÉS AVEC SOIN.',
            'why_5_desc' => 'Nous choisissons les hébergements ayant la meilleure réputation et des avis positifs.',
            'why_6_title' => 'MEILLEURS PRIX GARANTIS',
            'why_6_desc' => 'Nous vous garantissons un confort de premier ordre à un prix abordable.',
            'offers_title' => 'Meilleures offres de Depart Travel Services',
            'offer_1_title' => 'Réservation D\'hôtels',
            'offer_1_desc' => 'Profitez de nos comparateurs de prix et réservez vos hôtels aux meilleurs tarifs en Tunisie',
            'offer_2_title' => 'Location De Vacances',
            'offer_2_desc' => 'Si vous préférez être loin des complexes hôteliers, réservez vos locations de vacances en Tunisie ici',
            'offer_3_title' => 'Transferts',
            'offer_3_desc' => 'Réservez vos transfert en ligne partout ou vous êtes en un seul clic et évitez l\'attente',
            'offer_4_title' => 'Evénements',
            'offer_4_desc' => 'Séminaires, Team-building, voyage de groupe, en famille, voyage de noce, ou autre, vous pouvez compter sur nous',
            'reviews_title' => 'Nos échos',
            'contact_section_title' => 'VOUS AVEZ DES QUESTIONS ?',
            'contact_section_desc' => 'Que vous soyez curieux au sujet de nos offres, intéressé par des activités passionnantes, en quête d\'aventures uniques, ou simplement désireux d\'explorer nos circuits en Tunisie, nous sommes là pour répondre à toutes vos questions. N\'hésitez pas à nous contacter.',
            'contact_btn' => 'Envoyez nous un message',
            'url_about' => '/a-propos',
            'url_activities' => '/activites-a-djerba',
            'url_excursions' => '/excursions-au-depart-de-djerba',
            'url_circuits' => '/circuit-sur-mesure-en-tunisie',
            'url_blog' => '/blog-de-voyages',
            'url_contact' => '/contactez-nous',
            'url_hotels' => '/hotels-en-tunisie',
            'url_vacation' => '/location-de-vacances-en-tunisie',
            'url_transfers' => '/transferts-en-tunisie',
            'url_events' => '/evenements'
        ],
        'en' => [
            'accueil' => 'Home',
            'a_propos' => 'About Us',
            'activites' => 'Activities',
            'excursion' => 'Excursion',
            'circuits' => 'Tours',
            'blog' => 'Blog',
            'contact' => 'Contact',
            'main_title' => 'DEPART TRAVEL SERVICES',
            'subtitle' => 'You arrive as clients, you leave as FRIENDS',
            'description_p1' => 'Depart Travel Services goes beyond being just a travel agency. We are the gateway to unforgettable travel experiences. It\'s your ticket to an enriching adventure, where each journey is a unique experience, each moment a discovery, and each destination a door to unforgettable memories.',
            'description_h1' => 'Expertise in Djerba',
            'description_p2' => 'Based in Djerba, Depart Travel Services stands out for the quality of its experienced team, ready to offer you a complete range of services. If you\'re looking for a serious approach, unrivaled know-how, professional expertise, and impeccable service, look no further, look nowhere else!',
            'description_h2' => 'Unforgettable Vacations',
            'description_p3' => 'Even before your arrival, we will help you prepare your vacations in an exceptional way and make the most of your stay. Once here, we will guide you to the secret corners of our beautiful country, revealing hidden treasures such as the desert, picturesque Berber villages, and sites that most visitors never discover, settling for the beach or the pool of their hotels. Our mission consists of much more than simply taking you from one place to another.',
            'description_h3' => 'Adventure with Depart Travel Services',
            'description_p4' => 'By choosing to travel with us, prepare yourself for an incomparable adventure, a total change of scenery, a perfect fusion between relaxation, leisure, and authentic discoveries at the heart of local life. We don\'t just take you to the heart of the everyday life of local residents, but we truly immerse you in a new, real, and authentic dimension.',
            'description_h4' => 'Our Services',
            'description_p5' => 'In this space, we offer you a range of services, particularly:',
            'services_list' => [
                'Hotel reservations throughout Tunisia.',
                'Excursions in Djerba.',
                'Creation of tailor-made tours in Tunisia.',
                'Discovery of unique activities and walks in Djerba.',
                'Transfers throughout Tunisian territory.',
                'Access to our expert travel guide to discover in detail everything you wish to know about our country.'
            ],
            'feature_1_title' => 'Local Experience',
            'feature_1_desc' => 'Go through the locals and enjoy this authentic experience away from mass tourism and beaten paths.',
            'feature_2_title' => 'Tailored',
            'feature_2_desc' => 'Go through the locals and enjoy this authentic experience away from mass tourism and beaten paths.',
            'feature_3_title' => 'Availability',
            'feature_3_desc' => 'With us, there are never moments when you cannot disturb. We are always at your disposal.',
            'feature_4_title' => 'Speed',
            'feature_4_desc' => 'One is never safe from an incident. It\'s the speed and efficiency of interventions that make the difference.',
            'adventures_title' => 'Our Adventures',
            'activity_title' => 'Activities in Djerba',
            'activity_desc' => 'Captivating activities, adrenaline-filled adventures await you',
            'activity_btn' => 'View activities list',
            'excursion_title' => 'Excursions from Djerba',
            'excursion_desc' => 'Set off on an adventure with our exciting excursions, and experience unforgettable moments.',
            'excursion_btn' => 'View excursions list',
            'circuit_title' => 'Tailor-made tours',
            'circuit_desc' => 'Explore the hidden treasures of Tunisia with our exciting tours.',
            'circuit_btn' => 'View tours list',
            'why_title' => 'Why Depart Travel Services',
            'why_1_title' => '100% CUSTOMIZED SERVICES',
            'why_1_desc' => 'We offer fully customized services with the expertise of our travel specialists.',
            'why_2_title' => 'WIDE VARIETY OF DESTINATIONS',
            'why_2_desc' => 'With us, you will find a perfect destination among dozens of available options',
            'why_3_title' => 'HIGHLY QUALIFIED SERVICE',
            'why_3_desc' => 'Our high level of service is officially recognized by thousands of customers',
            'why_4_title' => '24/7 ASSISTANCE',
            'why_4_desc' => 'Our travel agents are always there to support you during your trip.',
            'why_5_title' => 'CAREFULLY SELECTED PROGRAMS',
            'why_5_desc' => 'We choose accommodations with the best reputation and positive reviews.',
            'why_6_title' => 'BEST PRICES GUARANTEED',
            'why_6_desc' => 'We guarantee you first-class comfort at an affordable price.',
            'offers_title' => 'Best offers from Depart Travel Services',
            'offer_1_title' => 'Hotel Booking',
            'offer_1_desc' => 'Take advantage of our price comparators and book your hotels at the best rates in Tunisia',
            'offer_2_title' => 'Vacation Rental',
            'offer_2_desc' => 'If you prefer to be away from hotel complexes, book your vacation rentals in Tunisia here',
            'offer_3_title' => 'Transfers',
            'offer_3_desc' => 'Book your transfers online wherever you are with just one click and avoid waiting',
            'offer_4_title' => 'Events',
            'offer_4_desc' => 'Seminars, Team-building, group travel, family, honeymoon, or other, you can count on us',
            'reviews_title' => 'Our echoes',
            'contact_section_title' => 'DO YOU HAVE QUESTIONS?',
            'contact_section_desc' => 'Whether you are curious about our offers, interested in exciting activities, in search of unique adventures, or simply want to explore our tours in Tunisia, we are here to answer all your questions. Don\'t hesitate to contact us.',
            'contact_btn' => 'Send us a message',
            'url_about' => '/en/about-us',
            'url_activities' => '/en/activities-in-djerba',
            'url_excursions' => '/en/excursions-from-djerba',
            'url_circuits' => '/en/tailor-made-tours',
            'url_blog' => '/en/travel-blog',
            'url_contact' => '/en/contact-us',
            'url_hotels' => '/en/hotels-in-tunisia',
            'url_vacation' => '/en/vacation-rental',
            'url_transfers' => '/en/transfers-in-tunisia',
            'url_events' => '/en/organize-your-events-with-us'
        ],
        'it' => [
            'accueil' => 'Home',
            'a_propos' => 'Su di noi',
            'activites' => 'Attività',
            'excursion' => 'Escursioni',
            'circuits' => 'Tour',
            'blog' => 'Blog',
            'contact' => 'Contatti',
            'main_title' => 'DEPART TRAVEL SERVICES',
            'subtitle' => 'Arrivate come clienti, partite come AMICI',
            'description_p1' => 'Depart Travel Services va oltre il semplice essere un\'agenzia di viaggi. Siamo la porta d\'accesso a esperienze di viaggio indimenticabili. È il tuo biglietto per un\'avventura arricchente, dove ogni viaggio è un\'esperienza unica, ogni momento una scoperta e ogni destinazione una porta aperta verso ricordi indimenticabili.',
            'description_h1' => 'Esperienza a Djerba',
            'description_p2' => 'Basata a Djerba, Depart Travel Services si distingue per la qualità del suo team esperto, pronto a offrirvi una gamma completa di servizi. Se cercate un approccio serio, un know-how senza pari, una competenza professionale e un servizio impeccabile, non cercate oltre, non cercate altrove!',
            'description_h2' => 'Vacanze Indimenticabili',
            'description_p3' => 'Ancor prima del vostro arrivo, vi aiuteremo a preparare le vostre vacanze in modo eccezionale e a sfruttare al meglio il vostro soggiorno. Una volta qui, vi guideremo verso gli angoli segreti del nostro bellissimo paese, rivelando tesori nascosti come il deserto, i pittoreschi villaggi berberi e i siti che la maggior parte dei visitatori non scopre mai, accontentandosi della spiaggia o della piscina dei loro hotel. La nostra missione consiste in molto più che semplicemente portarvi da un posto all\'altro.',
            'description_h3' => 'Avventura con Depart Travel Services',
            'description_p4' => 'Scegliendo di partire con noi, preparatevi a un\'avventura incomparabile, un totale cambiamento di scenario, una perfetta fusione tra relax, svago e scoperte autentiche nel cuore della vita locale. Non ci limitiamo a portarvi nel cuore della vita quotidiana degli abitanti locali, ma vi immergiamo veramente in una dimensione nuova, reale e autentica.',
            'description_h4' => 'I Nostri Servizi',
            'description_p5' => 'In questo spazio, vi offriamo una gamma di servizi, in particolare:',
            'services_list' => [
                'Prenotazioni di hotel in tutta la Tunisia.',
                'Escursioni a Djerba.',
                'Creazione di tour su misura in Tunisia.',
                'Scoperta di attività e passeggiate uniche a Djerba.',
                'Trasferimenti in tutto il territorio tunisino.',
                'Accesso alla nostra guida di viaggio esperta per scoprire in dettaglio tutto ciò che desiderate sapere sul nostro paese.'
            ],
            'feature_1_title' => 'Esperienza Locale',
            'feature_1_desc' => 'Passa attraverso i locali e goditi questa autentica esperienza lontano dal turismo di massa e dai sentieri battuti.',
            'feature_2_title' => 'Su Misura',
            'feature_2_desc' => 'Passa attraverso i locali e goditi questa autentica esperienza lontano dal turismo di massa e dai sentieri battuti.',
            'feature_3_title' => 'Disponibilità',
            'feature_3_desc' => 'Con noi, non ci sono mai momenti in cui non si può disturbare. Siamo sempre a vostra disposizione.',
            'feature_4_title' => 'Velocità',
            'feature_4_desc' => 'Non si è mai al riparo da un incidente. È la velocità e l\'efficienza degli interventi che fanno la differenza.',
            'adventures_title' => 'Le Nostre Avventure',
            'activity_title' => 'Attività a Djerba',
            'activity_desc' => 'Ti aspettano attività avvincenti, avventure piene di adrenalina',
            'activity_btn' => 'Visualizza l\'elenco delle attività',
            'excursion_title' => 'Escursioni da Djerba',
            'excursion_desc' => 'Parti all\'avventura con le nostre emozionanti escursioni e vivi momenti indimenticabili.',
            'excursion_btn' => 'Visualizza l\'elenco delle escursioni',
            'circuit_title' => 'Tour su misura',
            'circuit_desc' => 'Esplora i tesori nascosti della Tunisia con i nostri emozionanti tour.',
            'circuit_btn' => 'Visualizza l\'elenco dei tour',
            'why_title' => 'Perché Depart Travel Services',
            'why_1_title' => 'SERVIZI 100% PERSONALIZZATI',
            'why_1_desc' => 'Offriamo servizi completamente personalizzati con l\'esperienza dei nostri specialisti di viaggio.',
            'why_2_title' => 'AMPIA VARIETÀ DI DESTINAZIONI',
            'why_2_desc' => 'Con noi, troverete una destinazione perfetta tra decine di opzioni disponibili',
            'why_3_title' => 'SERVIZIO ALTAMENTE QUALIFICATO',
            'why_3_desc' => 'Il nostro elevato livello di servizio è ufficialmente riconosciuto da migliaia di clienti',
            'why_4_title' => 'ASSISTENZA 24/7',
            'why_4_desc' => 'I nostri agenti di viaggio sono sempre presenti per sostenervi durante il vostro viaggio.',
            'why_5_title' => 'PROGRAMMI ACCURATAMENTE SELEZIONATI',
            'why_5_desc' => 'Scegliamo alloggi con la migliore reputazione e recensioni positive.',
            'why_6_title' => 'MIGLIOR PREZZO GARANTITO',
            'why_6_desc' => 'Vi garantiamo un comfort di prima classe a un prezzo accessibile.',
            'offers_title' => 'Le migliori offerte di Depart Travel Services',
            'offer_1_title' => 'Prenotazione Hotel',
            'offer_1_desc' => 'Approfitta dei nostri comparatori di prezzi e prenota i tuoi hotel alle migliori tariffe in Tunisia',
            'offer_2_title' => 'Affitto Vacanze',
            'offer_2_desc' => 'Se preferisci essere lontano dai complessi alberghieri, prenota qui le tue case vacanze in Tunisia',
            'offer_3_title' => 'Trasferimenti',
            'offer_3_desc' => 'Prenota i tuoi trasferimenti online ovunque tu sia con un solo clic ed evita l\'attesa',
            'offer_4_title' => 'Eventi',
            'offer_4_desc' => 'Seminari, Team-building, viaggi di gruppo, famiglia, luna di miele, o altro, puoi contare su di noi',
            'reviews_title' => 'I Nostri Echi',
            'contact_section_title' => 'HAI DOMANDE?',
            'contact_section_desc' => 'Che tu sia curioso riguardo alle nostre offerte, interessato ad attività emozionanti, alla ricerca di avventure uniche, o semplicemente desideroso di esplorare i nostri tour in Tunisia, siamo qui per rispondere a tutte le tue domande. Non esitare a contattarci.',
            'contact_btn' => 'Inviaci un messaggio',
            'url_about' => '/it/su-di-noi',
            'url_activities' => '/it/attivita-a-djerba',
            'url_excursions' => '/it/escursioni-da-djerba',
            'url_circuits' => '/it/tour-su-misura',
            'url_blog' => '/it/blog-di-viaggi',
            'url_contact' => '/it/contattaci',
            'url_hotels' => '/it/hotel-in-tunisia',
            'url_vacation' => '/it/affitto-vacanze-in-tunisia',
            'url_transfers' => '/it/trasferimenti-in-tunisia',
            'url_events' => '/it/i-tuoi-eventi-con-noi'
        ],
        'de' => [
            'accueil' => 'Startseite',
            'a_propos' => 'Über uns',
            'activites' => 'Aktivitäten',
            'excursion' => 'Ausflug',
            'circuits' => 'Touren',
            'blog' => 'Blog',
            'contact' => 'Kontakt',
            'main_title' => 'DEPART TRAVEL SERVICES',
            'subtitle' => 'Sie kommen als Kunden, Sie gehen als FREUNDE',
            'description_p1' => 'Depart Travel Services geht über ein einfaches Reisebüro hinaus. Wir sind das Tor zu unvergesslichen Reiseerlebnissen. Es ist Ihr Ticket zu einem bereichernden Abenteuer, bei dem jede Reise ein einzigartiges Erlebnis, jeder Moment eine Entdeckung und jedes Ziel eine offene Tür zu unvergesslichen Erinnerungen ist.',
            'description_h1' => 'Expertise in Djerba',
            'description_p2' => 'Mit Sitz in Djerba zeichnet sich Depart Travel Services durch die Qualität seines erfahrenen Teams aus, das bereit ist, Ihnen ein komplettes Serviceangebot zu bieten. Wenn Sie nach einem seriösen Ansatz, unvergleichlichem Know-how, professioneller Expertise und tadellosem Service suchen, suchen Sie nicht weiter, suchen Sie nirgendwo anders!',
            'description_h2' => 'Unvergessliche Ferien',
            'description_p3' => 'Schon vor Ihrer Ankunft helfen wir Ihnen, Ihren Urlaub auf außergewöhnliche Weise vorzubereiten und das Beste aus Ihrem Aufenthalt zu machen. Einmal hier, führen wir Sie zu den geheimen Ecken unseres schönen Landes und enthüllen verborgene Schätze wie die Wüste, malerische Berberdörfer und Orte, die die meisten Besucher nie entdecken, da sie sich mit dem Strand oder dem Pool ihrer Hotels begnügen. Unsere Mission besteht aus viel mehr, als Sie einfach von einem Ort zum anderen zu bringen.',
            'description_h3' => 'Abenteuer mit Depart Travel Services',
            'description_p4' => 'Wenn Sie sich entscheiden, mit uns zu reisen, bereiten Sie sich auf ein unvergleichliches Abenteuer vor, einen totalen Tapetenwechsel, eine perfekte Verschmelzung zwischen Entspannung, Freizeit und authentischen Entdeckungen im Herzen des lokalen Lebens. Wir bringen Sie nicht nur ins Herz des Alltagslebens der lokalen Bewohner, sondern tauchen Sie wirklich in eine neue, reale und authentische Dimension ein.',
            'description_h4' => 'Unsere Dienstleistungen',
            'description_p5' => 'In diesem Bereich bieten wir Ihnen eine Reihe von Dienstleistungen an, insbesondere:',
            'services_list' => [
                'Hotelbuchungen in ganz Tunesien.',
                'Ausflüge in Djerba.',
                'Erstellung maßgeschneiderter Touren in Tunesien.',
                'Entdeckung einzigartiger Aktivitäten und Spaziergänge in Djerba.',
                'Transfers im gesamten tunesischen Gebiet.',
                'Zugang zu unserem Experten-Reiseführer, um im Detail alles zu entdecken, was Sie über unser Land wissen möchten.'
            ],
            'feature_1_title' => 'Lokale Erfahrung',
            'feature_1_desc' => 'Gehen Sie durch die Einheimischen und genießen Sie dieses authentische Erlebnis abseits des Massentourismus und der ausgetretenen Pfade.',
            'feature_2_title' => 'Maßgeschneidert',
            'feature_2_desc' => 'Gehen Sie durch die Einheimischen und genießen Sie dieses authentische Erlebnis abseits des Massentourismus und der ausgetretenen Pfade.',
            'feature_3_title' => 'Verfügbarkeit',
            'feature_3_desc' => 'Bei uns gibt es nie Momente, in denen man nicht stören kann. Wir stehen immer zu Ihrer Verfügung.',
            'feature_4_title' => 'Geschwindigkeit',
            'feature_4_desc' => 'Man ist nie vor einem Zwischenfall sicher. Es ist die Geschwindigkeit und Effizienz der Eingriffe, die den Unterschied machen.',
            'adventures_title' => 'Unsere Abenteuer',
            'activity_title' => 'Aktivitäten in Djerba',
            'activity_desc' => 'Fesselnde Aktivitäten, adrenalingeladene Abenteuer erwarten Sie',
            'activity_btn' => 'Aktivitätsliste anzeigen',
            'excursion_title' => 'Ausflüge von Djerba',
            'excursion_desc' => 'Brechen Sie zu einem Abenteuer mit unseren aufregenden Ausflügen auf und erleben Sie unvergessliche Momente.',
            'excursion_btn' => 'Ausflugsliste anzeigen',
            'circuit_title' => 'Maßgeschneiderte Touren',
            'circuit_desc' => 'Entdecken Sie die verborgenen Schätze Tunesiens mit unseren spannenden Touren.',
            'circuit_btn' => 'Tourenliste anzeigen',
            'why_title' => 'Warum Depart Travel Services',
            'why_1_title' => '100% INDIVIDUALISIERTE DIENSTE',
            'why_1_desc' => 'Wir bieten vollständig individualisierte Dienstleistungen mit der Expertise unserer Reisespezialisten.',
            'why_2_title' => 'GROSSE AUSWAHL AN ZIELEN',
            'why_2_desc' => 'Bei uns finden Sie ein perfektes Ziel unter Dutzenden von verfügbaren Optionen',
            'why_3_title' => 'HOCHQUALIFIZIERTER SERVICE',
            'why_3_desc' => 'Unser hohes Serviceniveau wird offiziell von Tausenden von Kunden anerkannt',
            'why_4_title' => '24/7 UNTERSTÜTZUNG',
            'why_4_desc' => 'Unsere Reiseberater sind immer da, um Sie während Ihrer Reise zu unterstützen.',
            'why_5_title' => 'SORGFÄLTIG AUSGEWÄHLTE PROGRAMME',
            'why_5_desc' => 'Wir wählen Unterkünfte mit dem besten Ruf und positiven Bewertungen aus.',
            'why_6_title' => 'BESTE PREISE GARANTIERT',
            'why_6_desc' => 'Wir garantieren Ihnen erstklassigen Komfort zu einem erschwinglichen Preis.',
            'offers_title' => 'Beste Angebote von Depart Travel Services',
            'offer_1_title' => 'Hotelbuchung',
            'offer_1_desc' => 'Nutzen Sie unsere Preisvergleicher und buchen Sie Ihre Hotels zu den besten Preisen in Tunesien',
            'offer_2_title' => 'Ferienvermietung',
            'offer_2_desc' => 'Wenn Sie lieber abseits von Hotelanlagen sein möchten, buchen Sie hier Ihre Ferienwohnungen in Tunesien',
            'offer_3_title' => 'Transfers',
            'offer_3_desc' => 'Buchen Sie Ihre Transfers online, wo immer Sie sind, mit nur einem Klick und vermeiden Sie Wartezeiten',
            'offer_4_title' => 'Veranstaltungen',
            'offer_4_desc' => 'Seminare, Teambuilding, Gruppenreisen, Familie, Flitterwochen oder andere, Sie können auf uns zählen',
            'reviews_title' => 'Unsere Echos',
            'contact_section_title' => 'HABEN SIE FRAGEN?',
            'contact_section_desc' => 'Ob Sie neugierig auf unsere Angebote sind, Interesse an spannenden Aktivitäten haben, auf der Suche nach einzigartigen Abenteuern sind oder einfach nur unsere Touren in Tunesien erkunden möchten, wir sind hier, um alle Ihre Fragen zu beantworten. Zögern Sie nicht, uns zu kontaktieren.',
            'contact_btn' => 'Senden Sie uns eine Nachricht',
            'url_about' => '/de/uber-uns',
            'url_activities' => '/de/aktivitaten-in-djerba',
            'url_excursions' => '/de/ausfluge-ab-djerba',
            'url_circuits' => '/de/masgeschneiderte-touren',
            'url_blog' => '/de/reiseblog',
            'url_contact' => '/de/kontaktieren-sie-uns',
            'url_hotels' => '/de/hotels-in-tunesien',
            'url_vacation' => '/de/ferienvermietung-in-tunesien',
            'url_transfers' => '/de/transfers-in-tunesien',
            'url_events' => '/de/ihre-veranstaltungen-mit-uns'
        ]
    ];

    return $translations[$lang];
}

// Get current language and translations
$lang = get_current_language();
$translations = get_translations();

// Get WordPress functions (if needed)
$site_url = function_exists('home_url') ? home_url() : "";
$logo_url = function_exists('get_theme_mod') ? get_theme_mod('custom_logo') : "";

// Function to get language URL prefix
function get_lang_prefix() {
    $lang = get_current_language();
    return $lang === 'fr' ? '' : '/' . $lang;
}

?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Depart Travel Services - <?php echo $translations['main_title']; ?></title>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- Swiper JS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css">

    <style>
        /* Global Styles */
        :root {
            --primary-color: #0a6cff;
            --secondary-color: #6c757d;
            --accent-color: #ff6b6b;
            --light-color: #f8f9fa;
            --dark-color: #343a40;
            --text-color: #212529;
            --border-radius: 0.5rem;
            --box-shadow: 0 0.5rem 1rem rgba(0,0,0,.15);
            --transition: all 0.3s ease;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            color: var(--text-color);
            line-height: 1.6;
            overflow-x: hidden;
            background-color: #fff;
        }

        a {
            text-decoration: none;
            color: var(--primarycolor);
            transition: var(--transition);
        }

        a:hover {
            color: #0056b3;
        }

        ul {
            list-style: none;
        }

        img {
            max-width: 100%;
            height: auto;
        }

        .container {
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 15px;
        }

        .text-center {
            text-align: center;
        }

        .btn {
            display: inline-block;
            font-weight: 500;
            color: #fff;
            background-color: var(--primary-color);
            text-align: center;
            vertical-align: middle;
            border: 1px solid transparent;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: var(--border-radius);
            transition: var(--transition);
            cursor: pointer;
        }

        .btn:hover {
            background-color: #0056b3;
            color: #fff;
        }

        .btn-outline {
            color: var(--primary-color);
            background-color: transparent;
            border-color: var(--primary-color);
        }

        .btn-outline:hover {
            color: #fff;
            background-color: var(--primary-color);
        }

        .section {
            padding: 5rem 0;
        }

        .section-title {
            margin-bottom: 3rem;
            text-align: center;
        }

        .section-title h2 {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--dark-color);
            position: relative;
            display: inline-block;
            margin-bottom: 1.5rem;
        }

        .section-title h2:after {
            content: '';
            width: 50px;
            height: 3px;
            background-color: var(--primary-color);
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
        }

        /* Header Styles */
        header {
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            height: 70px; /* Fixed height */
        }

        .navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem 0;
            height: 100%;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
        }

        .logo img {
            max-height: 60px;
        }

        .nav-menu {
            display: flex;
            align-items: center;
        }

        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                right: -100%;
                width: 70%;
                max-height: 80vh;
                background-color: #fff;
                flex-direction: column;
                align-items: flex-start;
                padding: 0.5rem;
                box-shadow: -5px 0 10px rgba(0,0,0,0.1);
                transition: var(--transition);
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                z-index: 1001;
                display: flex;
                flex-wrap: wrap;
            }
        }

        .nav-item {
            margin-left: 0.8rem;
        }
        
        /* This ensures all icons in the navigation have blue color */
        .nav-link i, .icon-item i {
            color: var(--primary-color);
        }

        .nav-link {
            font-size: 1rem;
            font-weight: 500;
            color: var(--dark-color);
            padding: 0.5rem;
        }

        .nav-link:hover {
            color: var(--primary-color);
        }

        .lang-select {
            position: relative;
            margin-left: 1.5rem;
        }

        .lang-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            cursor: pointer;
            white-space: nowrap;
            background-color: #f8f9fa;
            border-radius: 20px;
            padding: 5px 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }

        .lang-btn:hover {
            background-color: #e9ecef;
        }

        .lang-btn i {
            margin-left: 0.5rem;
            color: var(--primary-color);
        }

        .lang-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            background-color: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            border-radius: 12px;
            min-width: 150px;
            display: none;
            z-index: 1050;
            padding: 8px;
            margin-top: 10px;
            overflow: hidden;
        }

        @media (max-width: 768px) {
            .lang-dropdown {
                position: absolute;
                bottom: 100%;
                left: 0;
                margin-top: 0;
                margin-bottom: 10px;
                width: 100%;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                border: 1px solid #eee;
                z-index: 1010;
            }
            .lang-select {
                position: relative;
                width: auto;
            }
        }

        /* Triangle indicator for dropdown */
        .lang-dropdown:before {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            background-color: #fff;
            transform: rotate(45deg);
        }

        /* Desktop - arrow at top */
        @media (min-width: 769px) {
            .lang-dropdown:before {
                top: -8px;
                right: 20px;
                box-shadow: -2px -2px 5px rgba(0,0,0,0.05);
            }
        }

        /* Mobile - arrow at bottom */
        @media (max-width: 768px) {
            .lang-dropdown:before {
                bottom: -8px;
                left: 20px;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.05);
            }
        }

        .lang-dropdown.show {
            display: block;
            animation: fadeIn 0.3s;
        }

        @media (min-width: 769px) {
            .lang-dropdown.show {
                top: 100%;
                right: 0;
                left: auto;
                width: auto;
                position: absolute;
                /* Ensure the dropdown appears outside any container constraints */
                margin-top: 10px;
            }
            
            /* Make sure the container doesn't clip the dropdown */
            .nav-menu, .icon-container, .nav-item {
                overflow: visible !important;
            }
        }

        /* Different animations for mobile vs desktop */
        @media (min-width: 769px) {
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        }

        @media (max-width: 768px) {
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        }

        .lang-option {
            padding: 10px 12px;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            border-radius: 8px;
            margin-bottom: 4px;
        }

        .lang-option:last-child {
            margin-bottom: 0;
        }

        .lang-option:hover {
            background-color: #f0f4f8;
        }

        .lang-flag {
            width: 24px;
            height: 16px;
            margin-right: 10px;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .mobile-toggle {
            display: none;
            cursor: pointer;
            font-size: 1.5rem;
        }

        /* Hero Section */
        .hero {
            padding-top: 7rem;
            padding-bottom: 4rem;
            background: url('https://i.imgur.com/0Iri9NA.jpg') no-repeat center center;
            background-size: cover;
            color: #ffffff;
        }
        
        /* Tour Search Styles */
        .dts-tour-search {
            max-width: 900px;
            margin: -50px auto 50px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 24px;
            position: relative;
            z-index: 10;
        }

        .dts-tour-search-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 16px;
        }

        @media (min-width: 640px) {
            .dts-tour-search-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        @media (min-width: 1024px) {
            .dts-tour-search-grid {
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
        }

        .dts-tour-search-item {
            position: relative;
        }

        .dts-tour-search-button {
            display: block;
            width: 100%;
            padding: 12px 16px;
            background: var(--primary-color, #0068B7);
            color: #ffffff;
            font-size: 1.125rem;
            font-weight: 500;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: center;
            height: 48px;
            line-height: 24px;
        }

        .dts-tour-search-button:hover {
            background: var(--primary-dark, #005294);
        }

        .dts-tour-search-input {
            width: 100%;
            padding: 12px 16px;
            padding-left: 40px;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            font-size: 0.875rem;
            background-color: #ffffff;
            cursor: pointer;
            text-align: left;
            font-weight: normal;
            color: #333333; /* Ensuring text stays black */
        }

        .dts-tour-search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #0068B7;  /* Changed to blue color */
            width: 16px;
            height: 16px;
        }

        .dts-tour-search-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 4px;
            background: #ffffff;
            border-radius: 6px;
            box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.15);
            padding: 16px;
            width: 340px;
            min-width: 340px; /* Fixed minimum width for better calendar display */
            max-width: 350px; /* Maximum width to prevent oversizing */
            z-index: 999; /* Higher z-index to prevent overlap issues */
            display: none;
            color: #333333; /* Ensuring text stays black */
        }

        .dts-tour-search-dropdown.show {
            display: block;
        }

        .dts-tour-search-calendar {
            min-width: 270px; /* Ensure calendar has sufficient width */
            padding: 16px;
            background-color: #ffffff;
            border-radius: 4px;
            overflow: hidden;
        }

        .dts-tour-search-calendar table {
            width: 100%;
            border-collapse: collapse;
            background-color: #ffffff;
            table-layout: fixed;
        }

        .dts-tour-search-calendar th,
        .dts-tour-search-calendar td {
            padding: 8px 2px;
            text-align: center;
            background-color: #ffffff;
            height: 36px;
            width: 36px;
            box-sizing: border-box;
        }
        
        .calendar-container {
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            width: 100%;
        }
        
        @media (min-width: 768px) {
            .calendar-container {
                flex-direction: row;
                justify-content: space-between;
                gap: 8px;
            }
        }
        
        .calendar-month {
            background-color: #ffffff;
            margin-bottom: 8px;
            border-radius: 4px;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .calendar-month table {
            border: 1px solid #eaeaea;
            border-radius: 4px;
            overflow: hidden;
            width: 100%;
            table-layout: fixed; /* Makes all columns equal width */
        }
        
        .calendar-header {
            font-weight: bold;
            margin-bottom: 4px;
            text-align: center;
            padding: 6px 0;
            background-color: #ffffff;
            color: #0068B7;
        }

        .dts-tour-search-calendar .day {
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.2s;
        }

        .dts-tour-search-calendar .day:hover {
            background-color: #f3f4f6;
        }

        .dts-tour-search-calendar .day.selected {
            background-color: var(--primary-color, #0068B7);
            color: white;
        }

        .dts-tour-search-calendar .day.range {
            background-color: rgba(0, 104, 183, 0.2);
        }

        .dts-tour-search-calendar .day.disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }

        .dts-tour-search-cities,
        .dts-tour-search-types {
            list-style: none;
            padding: 0;
            margin: 0;
            max-height: 200px;
            overflow-y: auto;
        }

        .dts-tour-search-cities li,
        .dts-tour-search-types li {
            padding: 8px 12px;
            cursor: pointer;
            border-radius: 4px;
            transition: background-color 0.2s;
        }

        .dts-tour-search-cities li:hover,
        .dts-tour-search-types li:hover {
            background-color: #f3f4f6;
        }

        .dts-tour-search-cities li.selected,
        .dts-tour-search-types li.selected {
            background-color: rgba(0, 104, 183, 0.1);
            font-weight: 500;
        }

        .dts-tour-search-passengers {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .dts-passenger-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .dts-passenger-controls {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .dts-passenger-button {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #e2e8f0;
            background-color: #ffffff;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }

        .dts-passenger-button:hover {
            background-color: #f3f4f6;
        }

        .dts-passenger-count {
            width: 24px;
            text-align: center;
        }
        
        /* Continuing Hero Section */
        .hero {
            text-align: center;
            position: relative;
            min-height: 80vh;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1;
        }

        .hero-content {
            position: relative;
            z-index: 2;
            max-width: 800px;
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            text-align: center;
            padding: 2rem;
            width: 100%;
        }

        .hero-content h1,
        .hero-content p {
            color: #ffffff;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            text-transform: uppercase;
        }

        .hero-subtitle {
            font-size: 1.4rem;
            color: #555;
            margin-top: 0.5rem;
            font-style: italic;
        }

        .hero h2 {
            font-size: 2rem;
            font-weight: 400;
            margin-bottom: 2rem;
        }

        /* Swiper Styles */
        .swiper {
            width: 100%;
            padding: 20px 0;
        }

        .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .swiper-pagination {
            position: static;
            margin-top: 20px;
        }

        .swiper-button-next, .swiper-button-prev {
            color: var(--primary-color);
            width: 40px;
            height: 40px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .swiper-button-next:after, .swiper-button-prev:after {
            font-size: 20px;
            font-weight: bold;
        }

        .swiper-button-prev {
            left: 5px;
        }

        .swiper-button-next {
            right: 5px;
        }

        @media (max-width: 768px) {
            .swiper-button-next, .swiper-button-prev {
                top: 45%;
            }
        }

        /* Features Section */
        .features {
            background-color: #f8f9fa;
            padding: 4rem 0;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .features-swiper {
            display: none;
        }

        .feature-item {
            background-color: #fff;
            padding: 2rem;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            text-align: center;
            transition: var(--transition);
        }

        .feature-item:hover {
            transform: translateY(-10px);
        }

        .feature-icon {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 1.5rem;
        }

        .feature-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        /* About Section */
        .about-section {
            background-color: #fff;
            padding: 5rem 0;
        }

        .about-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .about-content h3 {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }

        .about-content p {
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }

        .services-list {
            padding-left: 1.5rem;
        }

        .services-list li {
            margin-bottom: 0.75rem;
            position: relative;
            padding-left: 1.5rem;
        }

        .services-list li:before {
            content: '✓';
            color: var(--primary-color);
            position: absolute;
            left: 0;
            top: 0;
        }

        /* Adventures Section */
        .adventures {
            background-color: #f8f9fa;
            padding: 5rem 0;
        }

        .adventures-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .adventure-card {
            background-color: #fff;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--box-shadow);
            transition: var(--transition);
        }

        .adventure-card:hover {
            transform: translateY(-10px);
        }

        .adventure-img {
            height: 200px;
            overflow: hidden;
        }

        .adventure-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: var(--transition);
        }

        .adventure-card:hover .adventure-img img {
            transform: scale(1.1);
        }

        .adventure-content {
            padding: 2rem;
        }

        .adventure-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .adventure-desc {
            margin-bottom: 1.5rem;
            color: var(--secondary-color);
        }

        /* Why Choose Us Section */
        .why-us {
            background-color: #fff;
            padding: 5rem 0;
        }

        .why-us-grid {
            display: none;
        }

        .why-us-swiper {
            display: block;
        }

        @media (max-width: 768px) {
            .why-us-grid {
                display: none;
            }
        }

        @media (max-width: 992px) {
            .why-us-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            /* Switch to swipers on mobile */
            .features-grid {
                display: none;
            }

            .features-swiper {
                display: block;
            }

            .why-us-grid {
                display: none;
            }

            .why-us-swiper {
                display: block;
            }

            .offers-grid {
                display: none;
            }

            .offers-swiper {
                display: block;
            }

            .reviews-grid {
                display: none;
            }

            .reviews-swiper {
                display: block;
            }
        }

        @media (max-width: 576px) {
            .why-us-grid {
                grid-template-columns: 1fr;
            }
        }

        .why-item {
            text-align: center;
            padding: 2rem;
            border-radius: var(--border-radius);
            transition: var(--transition);
            background-color: #f8f9fa;
        }

        .why-item:hover {
            box-shadow: var(--box-shadow);
            background-color: #fff;
        }

        .why-icon {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 1.5rem;
        }

        .why-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-transform: uppercase;
        }

        /* Offers Section */
        .offers {
            background-color: #f8f9fa;
            padding: 5rem 0;
        }

        .offers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
        }

        .offer-card {
            background-color: #fff;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            padding: 2rem;
            text-align: center;
            transition: var(--transition);
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .offer-card:hover {
            transform: translateY(-10px);
        }

        .offer-icon {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 1.5rem;
        }

        .offer-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .offer-desc {
            margin-bottom: 1.5rem;
            color: var(--secondary-color);
            flex-grow: 1;
        }

        /* Offers Swiper Section - Mobile */
        .offers-swiper {
            display: none;
            margin-top: 2rem;
        }

        .offers-swiper .swiper-slide {
            height: auto;
        }

        .offers-swiper-container {
            padding-bottom: 3rem;
        }

        /* Reviews Section */
        .reviews {
            background-color: #fff;
            padding: 5rem 0;
            text-align: center;
        }

        .reviews-platform {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background: #fff;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            min-height: 300px;
        }

        .platform-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .platform-rating {
            text-align: left;
        }

        .platform-rating .stars {
            color: #ffc107;
            font-size: 24px;
            margin-bottom: 5px;
        }

        .platform-rating .rating-text {
            color: #666;
            font-size: 16px;
        }

        .review-card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            margin: 10px;
            text-align: left;
            height: 100%;
        }

        .review-content {
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .review-stars {
            color: #ffc107;
            font-size: 18px;
            margin-bottom: 10px;
        }

        .review-content h4 {
            font-size: 18px;
            margin-bottom: 15px;
            color: #333;
        }

        .review-content p {
            color: #666;
            margin-bottom: 15px;
            flex-grow: 1;
        }

        .review-author {
            color: #888;
            font-style: italic;
            margin-top: auto;
        }

        /* Reviews Swiper Section - Mobile */
        .reviews-swiper {
            display: none;
            margin-top: 2rem;
        }

        .review-card {
            background-color: #fff;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            padding: 1.5rem;
            margin: 0 0.5rem;
            text-align: left;
        }

        .review-platform {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eee;
        }

        .review-stars {
            color: #ffc107;
            font-size: 1.25rem;
        }

        .review-content h4 {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: var(--dark-color);
        }

        .review-content p {
            font-size: 0.95rem;
            color: var(--secondary-color);
            margin-bottom: 1rem;
        }

        .review-author {
            font-style: italic;
            color: var(--dark-color);
            text-align: right;
        }

        /* Contact Section */
        .contact {
            background-color: #f8f9fa;
            padding: 5rem 0;
            text-align: center;
        }

        .contact-content {
            max-width: 700px;
            margin: 0 auto;
        }

        .contact h2 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }

        .contact p {
            margin-bottom: 2rem;
            font-size: 1.1rem;
        }

        /* Footer */
        footer {
            background-color: var(--dark-color);
            color: #fff;
            padding: 3rem 0;
        }

        .footer-content {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
        }

        .footer-info p {
            margin-bottom: 1rem;
        }

        .social-links {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 1.5rem;
        }

        .social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(255,255,255,0.1);
            color: #fff;
            transition: var(--transition);
        }

        .social-link:hover {
            background-color: var(--primary-color);
            color: #fff;
        }

        /* Search Modal */
        .search-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }

        .search-form {
            width: 100%;
            max-width: 600px;
            position: relative;
        }

        .search-input {
            width: 100%;
            padding: 1.5rem;
            font-size: 1.25rem;
            border: none;
            border-radius: var(--border-radius);
        }

        .search-submit {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--primary-color);
            cursor: pointer;
        }

        .search-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            color: #fff;
            cursor: pointer;
        }

        /* Responsive Styles */
        @media (max-width: 992px) {
            .hero h1 {
                font-size: 2.5rem;
            }

            .hero h2 {
                font-size: 1.5rem;
            }

            .section-title h2 {
                font-size: 2rem;
            }
        }

        @media (max-width: 768px) {
            .mobile-toggle {
                display: block;
            }

            .nav-menu {
                position: fixed;
                top: 70px;
                right: -100%;
                width: 70%;
                max-height: 80vh;
                background-color: #fff;
                flex-direction: column;
                align-items: flex-start;
                padding: 0.5rem;
                box-shadow: -5px 0 10px rgba(0,0,0,0.1);
                transition: var(--transition);
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                z-index: 1001;
                display: flex;
                flex-wrap: wrap;
            }

            .nav-menu.active {
                right: 0;
            }

            .nav-item {
                margin: 0.3rem 0;
                width: 100%;
            }

            .nav-link {
                width: 100%;
                display: block;
                padding: 0.5rem 0;
                border-bottom: 1px solid #eee;
                font-size: 0.95rem;
            }

            .icon-container {
                display: flex;
                align-items: center;
                margin-left: auto;
                gap: 20px;
            }

            .icon-item {
                display: flex;
                align-items: center;
            }

            .lang-select {
                display: flex;
                align-items: center;
            }

            @media (min-width: 769px) {
                .icon-container {
                    flex-direction: row;
                    justify-content: flex-end;
                }
            }

            /* Desktop styles */
            @media (min-width: 769px) {
                .nav-menu {
                    display: flex;
                    align-items: center;
                }

                .icon-container {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 20px;
                    margin-left: auto;
                    width: auto;
                    position: relative;
                }

                .icon-item {
                    width: auto;
                    margin: 0;
                    display: inline-flex;
                }

                .icon-item .nav-link {
                    padding: 0 10px;
                    white-space: nowrap;
                    display: inline-flex;
                    align-items: center;
                    flex-direction: row;
                }

                .lang-select {
                    margin: 0;
                    padding: 0 10px;
                    display: inline-flex;
                    position: relative;
                }

                .nav-menu .icon-container {
                    flex: 0 0 auto;
                    flex-direction: row;
                    justify-content: flex-end;
                    width: auto;
                    order: 2;
                }

                /* Force horizontal layout for icon items in desktop */
                .icon-container .icon-item,
                .icon-container .lang-select {
                    flex: 0 0 auto;
                    width: auto;
                    margin: 0 5px;
                    display: inline-flex;
                }

                .nav-item.icon-item {
                    display: inline-flex;
                }

                .nav-link {
                    display: flex;
                    align-items: center;
                }

                .icon-container {
                    display: flex !important;
                    flex-direction: row !important;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 15px;
                }
            }

            /* Mobile styles */
            /* Desktop styles first */
            .icon-container {
                display: flex !important;
                flex-direction: row !important;
                align-items: center;
                gap: 20px;
                margin-left: auto;
            }

            .icon-item {
                display: inline-flex;
                align-items: center;
            }

            .nav-link {
                display: flex;
                align-items: center;
                padding: 0.5rem 0.6rem;
                white-space: nowrap;
            }
            
            .nav-link i {
                margin-right: 5px;
                font-size: 1.1em;
                color: var(--primary-color);
            }

            .lang-select {
                margin-left: 20px;
            }

            /* Mobile styles override */
            @media (max-width: 768px) {
                .nav-menu .icon-container {
                    flex-direction: row;
                    justify-content: center;
                    width: 100%;
                    margin: 0.5rem 0;
                    gap: 10px;
                }

                .icon-item {
                    width: auto;
                    display: inline-flex;
                }

                .lang-select {
                    order: 0;
                    margin-left: 0;
                }
            }

            .icon-item .nav-link {
                border-bottom: none;
                padding: 0.5rem;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                text-align: left;
                white-space: nowrap;
            }

            .icon-item i {
                font-size: 1.2rem;
                margin-right: 5px;
                color: var(--primary-color);
            }

            .lang-select {
                margin: 0.3rem 0;
                width: auto;
                flex: 1;
                position: relative;
            }

            .lang-dropdown {
                position: absolute;
                width: 100%;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                margin-bottom: 0.5rem;
                padding: 12px;
                left: 0;
                bottom: 100%; /* Position above thebutton instead of below */
                z-index: 1001;
                background-color: #fff;
                border-radius: 8px;
                display: none;
                max-height: 80vh; /* Takes up to 80% of the viewport height */
                overflow-y: auto; /* Allows scrolling inside the dropdown if needed */
            }

            .icon-text {
                display: inline-block;
                font-size: 0.8rem;
                margin-left: 5px;
                text-align: left;
            }

            .lang-dropdown.show {
                display: block;
                position: absolute;
                left: 0;
                width: 100%;
                z-index: 9999;
            }

            .lang-option {
                padding: 12px 15px;
                margin-bottom: 5px;
                font-size: 16px;
                display: flex;
                align-items: center;
            }

            .hero h1 {
                font-size: 2rem;
            }

            .hero h2 {
                font-size: 1.25rem;
            }

            .section-title h2 {
                font-size: 1.75rem;
            }
        }
        .reviews-swiper {
            height: auto;
            width: 100%;
            display: block !important;
        }

        .reviews-swiper .swiper-wrapper {
            height: auto;
        }
        
        /* Navbar layout fixes */
        .navbar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            position: relative;
        }
        
        .nav-menu {
            flex: 1;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            overflow-x: auto;
            padding-bottom: 5px;
        }
        
        .icon-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            margin-left: auto;
        }
        
        @media (min-width: 769px) {
            .icon-container {
                margin-left: auto;
            }
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                flex-direction: column;
                width: 100%;
            }
            
            .icon-container {
                width: 100%;
                justify-content: center;
                margin-top: 10px;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <nav class="navbar">
                <a href="<?php echo get_lang_prefix(); ?>/" class="logo">
                    <!-- Imgur logo embed -->
                    <img src="https://i.imgur.com/uYzvgEn.png" alt="Depart Travel Services Logo" style="max-height: 60px; width: auto;">
                </a>

                <div class="mobile-toggle" id="mobile-toggle">
                    <i class="fas fa-bars"></i>
                </div>

                <ul class="nav-menu" id="nav-menu">
                    <li class="nav-item">
                        <a href="<?php echo get_lang_prefix(); ?>/" class="nav-link"><i class="fas fa-home"></i> <?php echo $translations['accueil']; ?></a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo $translations['url_about']; ?>" class="nav-link"><i class="fas fa-info-circle"></i> <?php echo $translations['a_propos']; ?></a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo $translations['url_activities']; ?>" class="nav-link"><i class="fas fa-hiking"></i> <?php echo $translations['activites']; ?></a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo $translations['url_excursions']; ?>" class="nav-link"><i class="fas fa-mountain"></i> <?php echo $translations['excursion']; ?></a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo $translations['url_circuits']; ?>" class="nav-link"><i class="fas fa-route"></i> <?php echo $translations['circuits']; ?></a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo $translations['url_blog']; ?>" class="nav-link"><i class="fas fa-blog"></i> <?php echo $translations['blog']; ?></a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo $translations['url_contact']; ?>" class="nav-link"><i class="fas fa-envelope"></i> <?php echo $translations['contact']; ?></a>
                    </li>
                    <li class="nav-item icon-container">
                        <div class="icon-item">
                            <a href="#" id="search-btn" class="nav-link">
                                <i class="fas fa-search"></i>
                                <span class="icon-text"><?php echo $translations['search'] ?? 'Search'; ?></span>
                            </a>
                        </div>
                        <div class="icon-item">
                            <a href="tel:+21625340201" class="nav-link">
                                <i class="fas fa-phone-alt"></i>
                                <span class="icon-text"><?php echo $translations['call'] ?? 'Call'; ?></span>
                            </a>
                        </div>
                        <div class="lang-select">
                            <div class="lang-btn" id="lang-btn">
                                <img src="https://flagicons.lipis.dev/flags/4x3/<?php echo $lang == 'en' ? 'gb' : $lang; ?>.svg" alt="<?php echo $lang; ?> Flag" class="lang-flag">
                                <?php echo strtoupper($lang); ?>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                            <div class="lang-dropdown" id="lang-dropdown">
                                <a href="/" class="lang-option">
                                    <img src="https://flagicons.lipis.dev/flags/4x3/fr.svg" alt="French Flag" class="lang-flag">
                                    Français
                                </a>
                                <a href="/en" class="lang-option">
                                    <img src="https://flagicons.lipis.dev/flags/4x3/gb.svg" alt="English Flag" class="lang-flag">
                                    English
                                </a>
                                <a href="/it" class="lang-option">
                                    <img src="https://flagicons.lipis.dev/flags/4x3/it.svg" alt="Italian Flag" class="lang-flag">
                                    Italiano
                                </a>
                                <a href="/de" class="lang-option">
                                    <img src="https://flagicons.lipis.dev/flags/4x3/de.svg" alt="German Flag" class="lang-flag">
                                    Deutsch
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1><?php echo $translations['main_title']; ?></h1>
                <p class="hero-subtitle"><?php echo $translations['subtitle']; ?></p>
            </div>
        </div>
    </section>
    
    <!-- Tour Search Section -->
    <div class="dts-tour-search">
        <div class="dts-tour-search-grid">
            <!-- Date Range Picker -->
            <div class="dts-tour-search-item" id="dateRangeContainer">
                <button class="dts-tour-search-input" id="dateRangeButton">
                    <span class="dts-tour-search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                    </span>
                    <span id="dateRangeText">Pick a date range</span>
                </button>
                <div class="dts-tour-search-dropdown" id="dateRangeDropdown">
                    <div class="dts-tour-search-calendar" id="dateRangeCalendar"></div>
                </div>
            </div>

            <!-- Departure City -->
            <div class="dts-tour-search-item" id="departureCityContainer">
                <button class="dts-tour-search-input" id="departureCityButton">
                    <span class="dts-tour-search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </span>
                    <span id="departureCityText">Departure City</span>
                </button>
                <div class="dts-tour-search-dropdown" id="departureCityDropdown">
                    <ul class="dts-tour-search-cities" id="departureCityList"></ul>
                </div>
            </div>

            <!-- Tour Type -->
            <div class="dts-tour-search-item" id="tourTypeContainer">
                <button class="dts-tour-search-input" id="tourTypeButton">
                    <span class="dts-tour-search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                        </svg>
                    </span>
                    <span id="tourTypeText">Tour Type</span>
                </button>
                <div class="dts-tour-search-dropdown" id="tourTypeDropdown">
                    <ul class="dts-tour-search-types" id="tourTypeList">
                        <li data-value="private">Private Tour</li>
                        <li data-value="join">Join a Group</li>
                        <li data-value="build">Build Your Tour</li>
                    </ul>
                </div>
            </div>

            <!-- Passengers -->
            <div class="dts-tour-search-item" id="passengersContainer">
                <button class="dts-tour-search-input" id="passengersButton">
                    <span class="dts-tour-search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </span>
                    <span id="passengersText">1 Passenger</span>
                </button>
                <div class="dts-tour-search-dropdown" id="passengersDropdown">
                    <div class="dts-tour-search-passengers">
                        <div class="dts-passenger-row">
                            <span>Adults</span>
                            <div class="dts-passenger-controls">
                                <button class="dts-passenger-button" id="adultsDecreaseBtn">-</button>
                                <span class="dts-passenger-count" id="adultsCount">1</span>
                                <button class="dts-passenger-button" id="adultsIncreaseBtn">+</button>
                            </div>
                        </div>
                        <div class="dts-passenger-row">
                            <span>Children</span>
                            <div class="dts-passenger-controls">
                                <button class="dts-passenger-button" id="childrenDecreaseBtn">-</button>
                                <span class="dts-passenger-count" id="childrenCount">0</span>
                                <button class="dts-passenger-button" id="childrenIncreaseBtn">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button class="dts-tour-search-button" id="searchButton">
            Find Your Perfect Tour
        </button>
    </div>

    <!-- Features Section -->
    <section class="features">
        <div class="container">
            <!-- For desktop view -->
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-globe-africa"></i>
                    </div>
                    <h3 class="feature-title"><?php echo $translations['feature_1_title']; ?></h3>
                    <p><?php echo $translations['feature_1_desc']; ?></p>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-pencil-ruler"></i>
                    </div>
                    <h3 class="feature-title"><?php echo $translations['feature_2_title']; ?></h3>
                    <p><?php echo $translations['feature_2_desc']; ?></p>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                    <h3 class="feature-title"><?php echo $translations['feature_3_title']; ?></h3>
                    <p><?php echo $translations['feature_3_desc']; ?></p>
                </div>

                <div class="feature-item">
                    <div class="feature-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3 class="feature-title"><?php echo $translations['feature_4_title']; ?></h3>
                    <p><?php echo $translations['feature_4_desc']; ?></p>
                </div>
            </div>

            <!-- For mobile view - Swiper -->
            <div class="features-swiper">
                <div class="swiper features-swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="feature-item">
                                <div class="feature-icon">
                                    <i class="fas fa-globe-africa"></i>
                                </div>
                                <h3 class="feature-title"><?php echo $translations['feature_1_title']; ?></h3>
                                <p><?php echo $translations['feature_1_desc']; ?></p>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="feature-item">
                                <div class="feature-icon">
                                    <i class="fas fa-pencil-ruler"></i>
                                </div>
                                <h3 class="feature-title"><?php echo $translations['feature_2_title']; ?></h3>
                                <p><?php echo $translations['feature_2_desc']; ?></p>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="feature-item">
                                <div class="feature-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <h3 class="feature-title"><?php echo $translations['feature_3_title']; ?></h3>
                                <p><?php echo $translations['feature_3_desc']; ?></p>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="feature-item">
                                <div class="feature-icon">
                                    <i class="fas fa-bolt"></i>
                                </div>
                                <h3 class="feature-title"><?php echo $translations['feature_4_title']; ?></h3>
                                <p><?php echo $translations['feature_4_desc']; ?></p>
                            </div>
                        </div>
                    </div>

                    <!-- Add pagination -->
                    <div class="swiper-pagination"></div>

                    <!-- Add navigation buttons -->
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section removed as requested -->

    <!-- Adventures Section -->
    <section class="adventures section">
        <div class="container">
            <div class="section-title">
                <h2><?php echo $translations['adventures_title']; ?></h2>
            </div>

            <!-- Desktop view -->
            <div class="adventures-grid">
                <div class="adventure-card">
                    <div class="adventure-img">
                        <img src="https://i.imgur.com/eUMnQX8.jpg" alt="<?php echo $translations['activity_title']; ?>">
                    </div>
                    <div class="adventure-content">
                        <h3 class="adventure-title"><?php echo $translations['activity_title']; ?></h3>
                        <p class="adventure-desc"><?php echo $translations['activity_desc']; ?></p>
                        <a href="<?php echo $translations['url_activities']; ?>" class="btn"><?php echo $translations['activity_btn']; ?></a>
                    </div>
                </div>

                <div class="adventure-card">
                    <div class="adventure-img">
                        <img src="https://i.imgur.com/2vYntId.jpg" alt="<?php echo $translations['excursion_title']; ?>">
                    </div>
                    <div class="adventure-content">
                        <h3 class="adventure-title"><?php echo $translations['excursion_title']; ?></h3>
                        <p class="adventure-desc"><?php echo $translations['excursion_desc']; ?></p>
                        <a href="<?php echo $translations['url_excursions']; ?>" class="btn"><?php echo $translations['excursion_btn']; ?></a>
                    </div>
                </div>

                <div class="adventure-card">
                    <div class="adventure-img">
                        <img src="https://i.imgur.com/EX7cx6a.jpg" alt="<?php echo $translations['circuit_title']; ?>">
                    </div>
                    <div class="adventure-content">
                        <h3 class="adventure-title"><?php echo $translations['circuit_title']; ?></h3>
                        <p class="adventure-desc"><?php echo $translations['circuit_desc']; ?></p>
                        <a href="<?php echo $translations['url_circuits']; ?>" class="btn"><?php echo $translations['circuit_btn']; ?></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Offers Section -->
    <section class="offers section">
        <div class="container">
            <div class="section-title">
                <h2><?php echo $translations['offers_title']; ?></h2>
            </div>

            <!-- Desktop view -->
            <div class="offers-grid">
                <div class="offer-card">
                    <div class="offer-icon">
                        <i class="fas fa-hotel"></i>
                    </div>
                    <h3 class="offer-title"><?php echo $translations['offer_1_title']; ?></h3>
                    <p class="offer-desc"><?php echo $translations['offer_1_desc']; ?></p>
                    <a href="<?php echo $translations['url_hotels']; ?>" class="btn btn-outline">
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <div class="offer-card">
                    <div class="offer-icon">
                        <i class="fas fa-home"></i>
                    </div>
                    <h3 class="offer-title"><?php echo $translations['offer_2_title']; ?></h3>
                    <p class="offer-desc"><?php echo $translations['offer_2_desc']; ?></p>
                    <a href="<?php echo $translations['url_vacation']; ?>" class="btn btn-outline">
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <div class="offer-card">
                    <div class="offer-icon">
                        <i class="fas fa-shuttle-van"></i>
                    </div>
                    <h3 class="offer-title"><?php echo $translations['offer_3_title']; ?></h3>
                    <p class="offer-desc"><?php echo $translations['offer_3_desc']; ?></p>
                    <a href="<?php echo $translations['url_transfers']; ?>" class="btn btn-outline">
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>

                <div class="offer-card">
                    <div class="offer-icon">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <h3 class="offer-title"><?php echo $translations['offer_4_title']; ?></h3>
                    <p class="offer-desc"><?php echo $translations['offer_4_desc']; ?></p>
                    <a href="<?php echo $translations['url_events']; ?>" class="btn btn-outline">
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>

            <!-- Mobile view - Swiper -->
            <div class="offers-swiper">
                <div class="swiper offers-swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="offer-card">
                                <div class="offer-icon">
                                    <i class="fas fa-hotel"></i>
                                </div>
                                <h3 class="offer-title"><?php echo $translations['offer_1_title']; ?></h3>
                                <p class="offer-desc"><?php echo $translations['offer_1_desc']; ?></p>
                                <a href="<?php echo $translations['url_hotels']; ?>" class="btn btn-outline">
                                    <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="offer-card">
                                <div class="offer-icon">
                                    <i class="fas fa-home"></i>
                                </div>
                                <h3 class="offer-title"><?php echo $translations['offer_2_title']; ?></h3>
                                <p class="offer-desc"><?php echo $translations['offer_2_desc']; ?></p>
                                <a href="<?php echo $translations['url_vacation']; ?>" class="btn btn-outline">
                                    <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="offer-card">
                                <div class="offer-icon">
                                    <i class="fas fa-shuttle-van"></i>
                                </div>
                                <h3 class="offer-title"><?php echo $translations['offer_3_title']; ?></h3>
                                <p class="offer-desc"><?php echo $translations['offer_3_desc']; ?></p>
                                <a href="<?php echo $translations['url_transfers']; ?>" class="btn btn-outline">
                                    <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="offer-card">
                                <div class="offer-icon">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <h3 class="offer-title"><?php echo $translations['offer_4_title']; ?></h3>
                                <p class="offer-desc"><?php echo $translations['offer_4_desc']; ?></p>
                                <a href="<?php echo $translations['url_events']; ?>" class="btn btn-outline">
                                    <i class="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Add pagination -->
                    <div class="swiper-pagination"></div>

                    <!-- Add navigation buttons -->
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-us section">
        <div class="container">
            <div class="section-title">
                <h2><?php echo $translations['why_title']; ?></h2>
            </div>

            <!-- Desktop view -->
            <div class="why-us-grid">
                <div class="why-item">
                    <div class="why-icon">
                        <i class="fas fa-user-cog"></i>
                    </div>
                    <h3 class="why-title"><?php echo $translations['why_1_title']; ?></h3>
                    <p><?php echo $translations['why_1_desc']; ?></p>
                </div>

                <div class="why-item">
                    <div class="why-icon">
                        <i class="fas fa-map-marked-alt"></i>
                    </div>
                    <h3 class="why-title"><?php echo $translations['why_2_title']; ?></h3>
                    <p><?php echo $translations['why_2_desc']; ?></p>
                </div>

                <div class="why-item">
                    <div class="why-icon">
                        <i class="fas fa-medal"></i>
                    </div>
                    <h3 class="why-title"><?php echo $translations['why_3_title']; ?></h3>
                    <p><?php echo $translations['why_3_desc']; ?></p>
                </div>

                <div class="why-item">
                    <div class="why-icon">
                        <i class="fas fa-headset"></i>
                    </div>
                    <h3 class="why-title"><?php echo $translations['why_4_title']; ?></h3>
                    <p><?php echo $translations['why_4_desc']; ?></p>
                </div>

                <div class="why-item">
                    <div class="why-icon">
                        <i class="fas fa-clipboard-check"></i>
                    </div>
                    <h3 class="why-title"><?php echo $translations['why_5_title']; ?></h3>
                    <p><?php echo $translations['why_5_desc']; ?></p>
                </div>

                <div class="why-item">
                    <div class="why-icon">
                        <i class="fas fa-tag"></i>
                    </div>
                    <h3 class="why-title"><?php echo $translations['why_6_title']; ?></h3>
                    <p><?php echo $translations['why_6_desc']; ?></p>
                </div>
            </div>



            <!-- For mobile view - Swiper showing 1 per slide -->
            <div class="why-us-swiper">
                <div class="swiper why-us-swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="why-item">
                                <div class="why-icon">
                                    <i class="fas fa-user-cog"></i>
                                </div>
                                <h3 class="why-title"><?php echo $translations['why_1_title']; ?></h3>
                                <p><?php echo $translations['why_1_desc']; ?></p>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="why-item">
                                <div class="why-icon">
                                    <i class="fas fa-map-marked-alt"></i>
                                </div>
                                <h3 class="why-title"><?php echo $translations['why_2_title']; ?></h3>
                                <p><?php echo $translations['why_2_desc']; ?></p>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="why-item">
                                <div class="why-icon">
                                    <i class="fas fa-medal"></i>
                                </div>
                                <h3 class="why-title"><?php echo $translations['why_3_title']; ?></h3>
                                <p><?php echo $translations['why_3_desc']; ?></p>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="why-item">
                                <div class="why-icon">
                                    <i class="fas fa-headset"></i>
                                </div>
                                <h3 class="why-title"><?php echo $translations['why_4_title']; ?></h3>
                                <p><?php echo $translations['why_4_desc']; ?></p>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="why-item">
                                <div class="why-icon">
                                    <i class="fas fa-clipboard-check"></i>
                                </div>
                                <h3 class="why-title"><?php echo $translations['why_5_title']; ?></h3>
                                <p><?php echo $translations['why_5_desc']; ?></p>
                            </div>
                        </div>

                        <div class="swiper-slide">
                            <div class="why-item">
                                <div class="why-icon">
                                    <i class="fas fa-tag"></i>
                                </div>
                                <h3 class="why-title"><?php echo $translations['why_6_title']; ?></h3>
                                <p><?php echo $translations['why_6_desc']; ?></p>
                            </div>
                        </div>
                    </div>

                    <!-- Add pagination -->
                    <div class="swiper-pagination"></div>

                    <!-- Add navigation buttons -->
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Reviews Section -->
    <section class="reviews section">
        <div class="container">
            <div class="section-title">
                <h2><?php echo $translations['reviews_title']; ?></h2>
            </div>

            <!-- TripAdvisor Reviews -->
            <div class="reviews-platform tripadvisor-reviews">
                <a href="https://www.tripadvisor.fr/Attraction_Review-g297941-d17630293-Reviews-Depart_Travel_Services-Djerba_Island_Medenine_Governorate.html" target="_blank" style="text-decoration: none; color: inherit;">
                    <div class="platform-header">
                        <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor" style="max-width: 200px; height: auto;">
                        <div class="platform-rating">
                            <div class="stars">★★★★★</div>
                            <div class="rating-text">5.0 · Travelers' Choice award 2022 & 2023</div>
                        </div>
                    </div>

                    <div class="swiper reviews-swiper tripadvisor-swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="review-card">
                                    <div class="review-content">
                                        <div class="review-stars">★★★★★</div>
                                        <h4>"Excellente excursion"</h4>
                                        <p>Super excursion avec Depart Travel. Kamel notre chauffeur était super sympathique et nous à fait découvrir pleins de belles choses. Je recommande.</p>
                                        <p class="review-author">- Julien (December 2023)</p>
                                    </div>
                                </div>
                            </div>

                            <div class="swiper-slide">
                                <div class="review-card">
                                    <div class="review-content">
                                        <div class="review-stars">★★★★★</div>
                                        <h4>"Excellent service"</h4>
                                        <p>Excellent service et bonne organisation. Le guide était très professionnel et sympathique. Une excursion qui restera gravée dans nos mémoires!</p>
                                        <p class="review-author">- Marie L. (November 2023)</p>
                                    </div>
                                </div>
                            </div>

                            <div class="swiper-slide">
                                <div class="review-card">
                                    <div class="review-content">
                                        <div class="review-stars">★★★★★</div>
                                        <h4>"À recommander sans hésitation"</h4>
                                        <p>Une équipe très professionnelle et accueillante. Nous avons fait plusieurs excursions avec eux et tout était parfait. Un grand merci!</p>
                                        <p class="review-author">- Pierre D. (December 2023)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </a>
            </div>

            <!-- Google Reviews -->
            <div class="reviews-platform google-reviews" style="margin-top: 40px;">
                <a href="https://www.google.com/maps/place/Depart+Travel+Services/@33.8075278,10.8453889,17z/data=!4m8!3m7!1s0x13aaa4b51d18f2c3:0x4e8cd62c9e2c9c74!8m2!3d33.8075278!4d10.8453889!9m1!1b1!16s%2Fg%2F11rqy4fvwz" target="_blank" style="text-decoration: none; color: inherit;">
                    <div class="platform-header">
                        <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" style="max-width: 150px; height: auto;">
                        <div class="platform-rating">
                            <div class="stars">★★★★★</div>
                            <div class="rating-text">4.9 · Based on 150+ reviews</div>
                        </div>
                    </div>

                    <div class="swiper reviews-swiper google-swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="review-card">
                                    <div class="review-content">
                                        <div class="review-stars">★★★★★</div>
                                        <h4>"Outstanding Service"</h4>
                                        <p>December 2023: Exceptional island tour! The guide was knowledgeable and showed us hidden gems we would never have found on our own.</p>
                                        <p class="review-author">- Laura B. (December 2023)</p>
                                    </div>
                                </div>
                            </div>

                            <div class="swiper-slide">
                                <div class="review-card">
                                    <div class="review-content">
                                        <div class="review-stars">★★★★★</div>
                                        <h4>"Amazing Cultural Experience"</h4>
                                        <p>The local village tour was incredible. We learned so much about Tunisian culture and traditions. Highly recommended!</p>
                                        <p class="review-author">- David M. (December 2023)</p>
                                    </div>
                                </div>
                            </div>

                            <div class="swiper-slide">
                                <div class="review-card">
                                    <div class="review-content">
                                        <div class="review-stars">★★★★★</div>
                                        <h4>"Professional and Reliable"</h4>
                                        <p>Airport transfers and day trips all perfectly organized. The team is responsive and professional. Will use again!</p>
                                        <p class="review-author">- Anna P. (November 2023)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                </a>
            </div>

            <!-- The mobile view reviews are now handled by the TripAdvisor and Google review sections above -->
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact section">
        <div class="container">
            <div class="contact-content">
                <h2><?php echo $translations['contact_section_title']; ?></h2>
                <p><?php echo $translations['contact_section_desc']; ?></p>
                <a href="<?php echo $translations['url_contact']; ?>" class="btn"><?php echo $translations['contact_btn']; ?></a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <h4>Depart Travel Services</h4>
                    <p>Your trusted partner for unforgettable travel experiences in Tunisia. We specialize in creating personalized adventures that showcase the beauty and culture of our region.</p>
                    <div class="footer-social">
                        <h4>Follow Us</h4>
                        <div class="social-links">
                            <a href="https://www.facebook.com/departtravelservices2019" target="_blank" class="social-link" aria-label="Facebook">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://www.instagram.com/depart_travel_services/" target="_blank" class="social-link" aria-label="Instagram">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="https://x.com/i/flow/login?redirect_after_login=%2Fdepart_travel" target="_blank" class="social-link" aria-label="Twitter">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.tiktok.com/@depart_travel_services" target="_blank" class="social-link" aria-label="TikTok">
                                <i class="fab fa-tiktok"></i>
                            </a>
                            <a href="https://tn.linkedin.com/in/depart-travel-services" target="_blank" class="social-link" aria-label="LinkedIn">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="footer-contact">
                    <h4>Contact Info</h4>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <p>Agence.departtravel@gmail.com</p>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <p>en face du Holiday Beach Hotel - Zone touristique - Djerba</p>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <p>(+216) 25 340 201</p>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <p>(+216) 75 75 55 15</p>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <p>(+216) 29 21 96 01</p>
                    </div>
                </div>

                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Destinations</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2024 Depart Travel Services. All rights reserved.</p>
                <div class="footer-legal">
                    <a href="/terms-and-conditions" class="terms-link">Terms & Conditions</a>
                    <a href="/privacy-policy" class="privacy-link">Privacy Policy</a>
                </div>
            </div>
        </div>
    </footer>

    <style>
        footer {
            background-color: #1a1a1a;
            color: #fff;
            padding: 4rem 0 2rem;
        }

        .footer-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
            margin-bottom: 3rem;
        }

        .footer-about {
            line-height: 1.6;
        }

        .footer-about p {
            margin-bottom: 1.5rem;
            opacity: 0.8;
            font-size: 0.95rem;
        }

        .footer-about h4,
        .footer-contact h4,
        .footer-links h4,
        .footer-social h4 {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
            color: #fff;
            position: relative;
            padding-bottom: 0.8rem;
        }

        .footer-about h4:after,
        .footer-contact h4:after,
        .footer-links h4:after,
        .footer-social h4:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 50px;
            height: 2px;
            background-color: var(--primary-color);
        }

        .footer-social h4 {
            margin-top: 2rem;
            font-size: 1.1rem;
        }

        .contact-item {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            margin-bottom: 1rem;
        }

        .contact-item i {
            color: var(--primary-color);
            font-size: 1.1rem;
            margin-top: 3px;
        }

        .contact-item p {
            margin: 0;
            line-height: 1.5;
        }

        .footer-links ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .footer-links li {
            margin-bottom: 0.8rem;
        }

        .footer-links a {
            color: #fff;
            text-decoration: none;
            transition: all 0.3s ease;
            opacity: 0.8;
            position: relative;
            padding-left: 15px;
        }

        .footer-links a:before {
            content: '›';
            position: absolute;
            left: 0;
            color: var(--primary-color);
        }

        .footer-links a:hover {
            opacity: 1;
            color: var(--primary-color);
            padding-left: 20px;
        }

        .social-links {
            display: flex;
            gap: 1rem;
        }

        .social-link {
            width: 40px;
            height: 40px;
            background: var(--primary-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            transition: all 0.3s ease;
        }

        .social-link:hover {
            transform: translateY(-5px);
            background: #0056b3;
            box-shadow: 0 5px 15px rgba(0, 86, 179, 0.3);
        }

        .footer-bottom {
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .footer-legal {
            display: flex;
            gap: 1.5rem;
        }

        .terms-link,
        .privacy-link {
            color: #fff;
            opacity: 0.7;
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }

        .terms-link:hover,
        .privacy-link:hover {
            color: var(--primary-color);
            opacity: 1;
        }

        @media (max-width: 992px) {
            .footer-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .footer-grid {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 2.5rem;
            }

            .footer-about h4:after,
            .footer-contact h4:after,
            .footer-links h4:after,
            .footer-social h4:after {
                left: 50%;
                transform: translateX(-50%);
            }

            .contact-item {
                justify-content: center;
                align-items: center;
            }

            .footer-links a {
                padding-left: 0;
            }

            .footer-links a:before {
                display: none;
            }

            .footer-links a:hover {
                padding-left: 0;
            }

            .social-links {
                justify-content: center;
            }

            .footer-legal {
                justify-content: center;
                margin-top: 0.5rem;
            }

            .footer-bottom {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
        }
    </style>

    <!-- Search Modal -->
    <div class="search-modal" id="search-modal">
        <button class="search-close" id="search-close">&times;</button>

        <form class="search-form" action="<?php echo $site_url; ?>" method="get">
            <input type="text" name="s" class="search-input" placeholder="<?php echo __('Search...', 'depart-travel'); ?>">
            <button type="submit" class="search-submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div>

    <!-- Swiper JS -->
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Mobile Menu Toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');

        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            if (mobileToggle.querySelector('i').classList.contains('fa-bars')) {
                mobileToggle.querySelector('i').classList.remove('fa-bars');
                mobileToggle.querySelector('i').classList.add('fa-times');
            } else {
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
            }
        });

        // Language Dropdown
        const langBtn = document.getElementById('lang-btn');
        const langDropdown = document.getElementById('lang-dropdown');

        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();

            // Toggle dropdown visibility
            langDropdown.classList.toggle('show');

            if (langDropdown.classList.contains('show')) {
                // Position based on screen size
                if (window.innerWidth <= 768) {
                    // Mobile: position above
                    langDropdown.style.top = 'auto';
                    langDropdown.style.bottom = '100%';
                    langDropdown.style.marginTop = '0';
                    langDropdown.style.marginBottom = '0.5rem';
                } else {
                    // Desktop: position below
                    langDropdown.style.top = '100%';
                    langDropdown.style.bottom = 'auto';
                    langDropdown.style.marginTop = '0.5rem';
                    langDropdown.style.marginBottom = '0';
                }
            }
        });

        document.addEventListener('click', function() {
            langDropdown.classList.remove('show');
        });

        // Adjust dropdown position on window resize
        window.addEventListener('resize', function() {
            if (langDropdown.classList.contains('show')) {
                if (window.innerWidth <= 768) {
                    // Mobile: position above
                    langDropdown.style.top = 'auto';
                    langDropdown.style.bottom = '100%';
                    langDropdown.style.marginTop = '0';
                    langDropdown.style.marginBottom = '0.5rem';
                } else {
                    // Desktop: position below
                    langDropdown.style.top = '100%';
                    langDropdown.style.bottom = 'auto';
                    langDropdown.style.marginTop = '0.5rem';
                    langDropdown.style.marginBottom = '0';
                }
            }
        });

        // Search Modal
        const searchBtn = document.getElementById('search-btn');
        const searchModal = document.getElementById('search-modal');
        const searchClose = document.getElementById('search-close');

        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            searchModal.style.display = 'flex';
        });

        searchClose.addEventListener('click', function() {
            searchModal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                searchModal.style.display = 'none';
            }
        });

        // Initialize all Swiper components for mobile view

        // Features Swiper
        const featuresSwiper = new Swiper('.features-swiper-container', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.features-swiper-container .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.features-swiper-container .swiper-button-next',
                prevEl: '.features-swiper-container .swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
        });

        // Why Us Additional Items Swiper
        const whyUsAdditionalSwiper = new Swiper('.why-us-additional-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.why-us-additional-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.why-us-additional-swiper .swiper-button-next',
                prevEl: '.why-us-additional-swiper .swiper-button-prev',
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                }
            }
        });

        // Mobile Why Us Swiper (all items)
        const whyUsMobileSwiper = new Swiper('.why-us-swiper-container', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.why-us-swiper-container .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.why-us-swiper-container .swiper-button-next',
                prevEl: '.why-us-swiper-container .swiper-button-prev',
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
        });

        // Offers Swiper
        const offersSwiper = new Swiper('.offers-swiper-container', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.offers-swiper-container .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.offers-swiper-container .swiper-button-next',
                prevEl: '.offers-swiper-container .swiper-button-prev',
            },
            autoplay: {
                delay: 6500,
                disableOnInteraction: false,
            },
        });

        // TripAdvisor Reviews Swiper
        const tripAdvisorSwiper = new Swiper('.tripadvisor-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.tripadvisor-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.tripadvisor-swiper .swiper-button-next',
                prevEl: '.tripadvisor-swiper .swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                }
            }
        });

        // Google Reviews Swiper
        const googleSwiper = new Swiper('.google-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: '.google-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.google-swiper .swiper-button-next',
                prevEl: '.google-swiper .swiper-button-prev',
            },
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                }
            }
        });

        // Tour Search Functionality
        // Constants
        const tunisiaCities = [
            "Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte", "Gabès", 
            "Ariana", "Gafsa", "Kasserine", "Monastir", "Hammamet", "Nabeul",
            "Djerba", "Douz"
        ];

        // State
        let dateRange = { from: null, to: null };
        let selectingSecondDate = false; // Flag to track date selection state
        let departureCity = "";
        let tourType = "private";
        let passengers = { adults: 1, children: 0 };

        // DOM Elements
        const dateRangeButton = document.getElementById('dateRangeButton');
        const dateRangeDropdown = document.getElementById('dateRangeDropdown');
        const dateRangeText = document.getElementById('dateRangeText');
        const dateRangeCalendar = document.getElementById('dateRangeCalendar');

        const departureCityButton = document.getElementById('departureCityButton');
        const departureCityDropdown = document.getElementById('departureCityDropdown');
        const departureCityText = document.getElementById('departureCityText');
        const departureCityList = document.getElementById('departureCityList');

        const tourTypeButton = document.getElementById('tourTypeButton');
        const tourTypeDropdown = document.getElementById('tourTypeDropdown');
        const tourTypeText = document.getElementById('tourTypeText');
        const tourTypeList = document.getElementById('tourTypeList');

        const passengersButton = document.getElementById('passengersButton');
        const passengersDropdown = document.getElementById('passengersDropdown');
        const passengersText = document.getElementById('passengersText');
        const adultsDecreaseBtn = document.getElementById('adultsDecreaseBtn');
        const adultsIncreaseBtn = document.getElementById('adultsIncreaseBtn');
        const adultsCount = document.getElementById('adultsCount');
        const childrenDecreaseBtn = document.getElementById('childrenDecreaseBtn');
        const childrenIncreaseBtn = document.getElementById('childrenIncreaseBtn');
        const childrenCount = document.getElementById('childrenCount');

        const searchButton = document.getElementById('searchButton');

        // Helper Functions
        function formatDate(date) {
            if (!date) return '';
            return date.toLocaleDateString();
        }

        function updateDateRangeText() {
            if (dateRange.from && dateRange.to) {
                dateRangeText.textContent = `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
            } else if (dateRange.from) {
                dateRangeText.textContent = `${formatDate(dateRange.from)} - Select End Date`;
            } else {
                dateRangeText.textContent = 'Pick a date range';
            }
        }

        function updatePassengersText() {
            const total = passengers.adults + passengers.children;
            passengersText.textContent = `${total} ${total === 1 ? 'Passenger' : 'Passengers'}`;
        }

        function closeAllDropdowns() {
            dateRangeDropdown.classList.remove('show');
            departureCityDropdown.classList.remove('show');
            tourTypeDropdown.classList.remove('show');
            passengersDropdown.classList.remove('show');
        }

        // Initialize city list
        function initializeCityList() {
            departureCityList.innerHTML = '';
            tunisiaCities.forEach(city => {
                const li = document.createElement('li');
                li.textContent = city;
                li.dataset.value = city;
                if (city === departureCity) {
                    li.classList.add('selected');
                }
                li.addEventListener('click', function() {
                    departureCity = city;
                    departureCityText.textContent = city;
                    departureCityList.querySelectorAll('li').forEach(el => el.classList.remove('selected'));
                    li.classList.add('selected');
                    closeAllDropdowns();
                });
                departureCityList.appendChild(li);
            });
        }

        // Initialize Calendar (Simple Version)
        // Store current view for month navigation
        let calendarViewMonth = new Date().getMonth();
        let calendarViewYear = new Date().getFullYear();
        
        function initializeCalendar() {
            const calendar = document.createElement('div');
            calendar.className = 'calendar-container';
            
            // Add navigation controls
            const navContainer = document.createElement('div');
            navContainer.className = 'calendar-navigation';
            navContainer.style.display = 'flex';
            navContainer.style.justifyContent = 'space-between';
            navContainer.style.marginBottom = '10px';
            
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '&laquo; Previous Month';
            prevButton.style.border = 'none';
            prevButton.style.background = 'none';
            prevButton.style.color = '#0068B7';
            prevButton.style.cursor = 'pointer';
            prevButton.addEventListener('click', function(e) {
                e.stopPropagation();
                if (calendarViewMonth === 0) {
                    calendarViewMonth = 11;
                    calendarViewYear--;
                } else {
                    calendarViewMonth--;
                }
                initializeCalendar();
            });
            
            const nextButton = document.createElement('button');
            nextButton.innerHTML = 'Next Month &raquo;';
            nextButton.style.border = 'none';
            nextButton.style.background = 'none';
            nextButton.style.color = '#0068B7';
            nextButton.style.cursor = 'pointer';
            nextButton.addEventListener('click', function(e) {
                e.stopPropagation();
                if (calendarViewMonth === 11) {
                    calendarViewMonth = 0;
                    calendarViewYear++;
                } else {
                    calendarViewMonth++;
                }
                initializeCalendar();
            });
            
            navContainer.appendChild(prevButton);
            navContainer.appendChild(nextButton);
            
            // Create current month calendar
            createMonthCalendar(calendar, calendarViewMonth, calendarViewYear);
            
            // Create next month calendar
            createMonthCalendar(calendar, calendarViewMonth + 1, calendarViewYear);
            
            dateRangeCalendar.innerHTML = '';
            dateRangeCalendar.appendChild(navContainer);
            dateRangeCalendar.appendChild(calendar);
        }
        
        function createMonthCalendar(container, month, year) {
            const monthDiv = document.createElement('div');
            monthDiv.className = 'calendar-month';
            
            // Adjust month and year if needed
            let adjustedYear = year;
            let adjustedMonth = month;
            if (month > 11) {
                adjustedMonth = month - 12;
                adjustedYear = year + 1;
            }
            
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                                'July', 'August', 'September', 'October', 'November', 'December'];
            
            // Month header
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.textContent = `${monthNames[adjustedMonth]} ${adjustedYear}`;
            monthDiv.appendChild(header);
            
            // Day headers
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            
            const table = document.createElement('table');
            
            // Add day headers
            const thead = document.createElement('thead');
            const tr = document.createElement('tr');
            dayNames.forEach(day => {
                const th = document.createElement('th');
                th.textContent = day;
                tr.appendChild(th);
            });
            thead.appendChild(tr);
            table.appendChild(thead);
            
            // Create calendar days
            const tbody = document.createElement('tbody');
            
            const firstDay = new Date(adjustedYear, adjustedMonth, 1);
            const lastDay = new Date(adjustedYear, adjustedMonth + 1, 0);
            const daysInMonth = lastDay.getDate();
            
            let date = 1;
            for (let i = 0; i < 6; i++) {
                if (date > daysInMonth) break;
                
                const row = document.createElement('tr');
                
                for (let j = 0; j < 7; j++) {
                    const cell = document.createElement('td');
                    
                    if (i === 0 && j < firstDay.getDay()) {
                        // Empty cells before first day of month
                        cell.textContent = '';
                    } else if (date > daysInMonth) {
                        // Empty cells after last day of month
                        cell.textContent = '';
                    } else {
                        // Actual days
                        cell.textContent = date;
                        cell.className = 'day';
                        
                        const currentDate = new Date(adjustedYear, adjustedMonth, date);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        
                        // Disable past dates
                        if (currentDate < today) {
                            cell.classList.add('disabled');
                        } else {
                            // Check if this date is in the selected range
                            if (dateRange.from && dateRange.to) {
                                if (currentDate >= dateRange.from && currentDate <= dateRange.to) {
                                    cell.classList.add('range');
                                }
                            }
                            
                            // Highlight selected dates
                            if (dateRange.from && currentDate.getTime() === dateRange.from.getTime()) {
                                cell.classList.add('selected');
                            }
                            if (dateRange.to && currentDate.getTime() === dateRange.to.getTime()) {
                                cell.classList.add('selected');
                            }
                            
                            // Add click event
                            cell.addEventListener('click', function() {
                                if (cell.classList.contains('disabled')) return;
                                
                                const selectedDate = new Date(adjustedYear, adjustedMonth, parseInt(cell.textContent));
                                
                                if (!selectingSecondDate) {
                                    // First selection - start new range
                                    dateRange = { from: selectedDate, to: null };
                                    selectingSecondDate = true;
                                } else {
                                    // Second selection - complete range
                                    if (selectedDate < dateRange.from) {
                                        // If second date is before first, swap them
                                        dateRange.to = dateRange.from;
                                        dateRange.from = selectedDate;
                                    } else {
                                        dateRange.to = selectedDate;
                                    }
                                    selectingSecondDate = false;
                                    // Do NOT close the dropdown - user will close it when ready
                                }
                                
                                updateDateRangeText();
                                initializeCalendar(); // Refresh calendar
                            });
                        }
                        
                        date++;
                    }
                    
                    row.appendChild(cell);
                }
                
                tbody.appendChild(row);
            }
            
            table.appendChild(tbody);
            monthDiv.appendChild(table);
            container.appendChild(monthDiv);
        }

        // Import Date Range Picker Module
        const DateRangePicker = {
            // State
            dateRange: { from: null, to: null },
            isSelectingEndDate: false,
            elements: {},
            
            // Initialize the date picker
            init: function(buttonId, dropdownId, textId, calendarId) {
                // Get all required elements
                this.elements = {
                    button: document.getElementById(buttonId),
                    dropdown: document.getElementById(dropdownId),
                    text: document.getElementById(textId),
                    calendar: document.getElementById(calendarId)
                };
                
                // Check if elements exist
                if (!this.elements.button || !this.elements.dropdown || 
                    !this.elements.text || !this.elements.calendar) {
                    console.error('DateRangePicker: Required elements not found');
                    return;
                }
                
                // Set button click handler
                this.elements.button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleDropdown();
                });
                
                // Prevent dropdown from closing when clicking inside
                this.elements.dropdown.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
                
                // Initialize display
                this.updateDisplayText();
            },
            
            // Toggle dropdown visibility
            toggleDropdown: function() {
                const isVisible = this.elements.dropdown.classList.contains('show');
                
                // Close all other dropdowns first
                document.querySelectorAll('.dts-tour-search-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
                
                if (!isVisible) {
                    // Show this dropdown
                    this.elements.dropdown.classList.add('show');
                    this.renderCalendar();
                }
            },
            
            // Update text display
            updateDisplayText: function() {
                if (this.dateRange.from && this.dateRange.to) {
                    this.elements.text.textContent = `${this.formatDate(this.dateRange.from)} - ${this.formatDate(this.dateRange.to)}`;
                    this.elements.text.style.color = '';
                } else if (this.dateRange.from) {
                    this.elements.text.textContent = `${this.formatDate(this.dateRange.from)} - Select End Date`;
                    this.elements.text.style.color = '#0068B7'; // Highlight text
                } else {
                    this.elements.text.textContent = 'Select dates';
                    this.elements.text.style.color = ''; // Reset color
                }
            },
            
            // Format date for display
            formatDate: function(date) {
                if (!date) return '';
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const year = date.getFullYear();
                return `${month}/${day}/${year}`;
            },
            
            // Format date for API
            formatAPIDate: function(date) {
                if (!date) return '';
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const year = date.getFullYear();
                return `${year}-${month}-${day}`;
            },
            
            // Current view state
            currentView: {
                month: new Date().getMonth(),
                year: new Date().getFullYear()
            },
            
            // Render the calendar
            renderCalendar: function() {
                const calendar = this.elements.calendar;
                calendar.innerHTML = '';
                
                // Create navigation
                const navRow = this.createNavigation();
                calendar.appendChild(navRow);
                
                // Create calendar grid
                const calendarGrid = this.createCalendarGrid();
                calendar.appendChild(calendarGrid);
                
                // Show a message if selecting end date
                if (this.isSelectingEndDate) {
                    const message = document.createElement('div');
                    message.textContent = 'Now select the end date';
                    message.style.textAlign = 'center';
                    message.style.marginTop = '10px';
                    message.style.color = '#0068B7';
                    message.style.fontWeight = 'bold';
                    calendar.appendChild(message);
                }
            },
            
            // Create calendar navigation row
            createNavigation: function() {
                const navRow = document.createElement('div');
                navRow.style.display = 'flex';
                navRow.style.justifyContent = 'space-between';
                navRow.style.alignItems = 'center';
                navRow.style.marginBottom = '15px';
                
                // Previous month button
                const prevBtn = document.createElement('button');
                prevBtn.innerHTML = '&laquo; Prev';
                prevBtn.style.background = 'none';
                prevBtn.style.border = 'none';
                prevBtn.style.cursor = 'pointer';
                prevBtn.style.color = '#0068B7';
                prevBtn.style.padding = '5px 10px';
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.navigateMonth(-1);
                });
                
                // Month display
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'];
                const monthDisplay = document.createElement('div');
                monthDisplay.textContent = `${monthNames[this.currentView.month]} ${this.currentView.year}`;
                monthDisplay.style.fontWeight = 'bold';
                
                // Next month button
                const nextBtn = document.createElement('button');
                nextBtn.innerHTML = 'Next &raquo;';
                nextBtn.style.background = 'none';
                nextBtn.style.border = 'none';
                nextBtn.style.cursor = 'pointer';
                nextBtn.style.color = '#0068B7';
                nextBtn.style.padding = '5px 10px';
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.navigateMonth(1);
                });
                
                navRow.appendChild(prevBtn);
                navRow.appendChild(monthDisplay);
                navRow.appendChild(nextBtn);
                
                return navRow;
            },
            
            // Navigate to previous/next month
            navigateMonth: function(direction) {
                let newMonth = this.currentView.month + direction;
                let newYear = this.currentView.year;
                
                if (newMonth < 0) {
                    newMonth = 11;
                    newYear--;
                } else if (newMonth > 11) {
                    newMonth = 0;
                    newYear++;
                }
                
                this.currentView.month = newMonth;
                this.currentView.year = newYear;
                this.renderCalendar();
            },
            
            // Create calendar grid
            createCalendarGrid: function() {
                const table = document.createElement('table');
                table.style.width = '100%';
                table.style.borderCollapse = 'collapse';
                
                // Create header row with day names
                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
                
                dayNames.forEach(day => {
                    const th = document.createElement('th');
                    th.textContent = day;
                    th.style.padding = '8px 4px';
                    th.style.textAlign = 'center';
                    headerRow.appendChild(th);
                });
                
                thead.appendChild(headerRow);
                table.appendChild(thead);
                
                // Create calendar body
                const tbody = document.createElement('tbody');
                
                const firstDay = new Date(this.currentView.year, this.currentView.month, 1);
                const startingDay = firstDay.getDay();
                const monthLength = new Date(this.currentView.year, this.currentView.month + 1, 0).getDate();
                
                // Get today for comparison
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                let day = 1;
                
                // Create weeks
                for (let i = 0; i < 6; i++) {
                    if (day > monthLength) break;
                    
                    const row = document.createElement('tr');
                    
                    // Create days
                    for (let j = 0; j < 7; j++) {
                        const cell = document.createElement('td');
                        cell.style.padding = '8px 4px';
                        cell.style.textAlign = 'center';
                        
                        // Empty cells before start of month or after end of month
                        if ((i === 0 && j < startingDay) || day > monthLength) {
                            cell.innerHTML = '&nbsp;';
                        } else {
                            // Date cells
                            const cellDiv = document.createElement('div');
                            cellDiv.textContent = day;
                            cellDiv.style.width = '30px';
                            cellDiv.style.height = '30px';
                            cellDiv.style.lineHeight = '30px';
                            cellDiv.style.margin = '0 auto';
                            cellDiv.style.borderRadius = '50%';
                            cellDiv.style.cursor = 'pointer';
                            
                            const cellDate = new Date(this.currentView.year, this.currentView.month, day);
                            
                            // Disable past dates
                            if (cellDate < today) {
                                cellDiv.style.color = '#ccc';
                                cellDiv.style.cursor = 'default';
                                cellDiv.classList.add('disabled');
                            } else {
                                // Check if date is selected start/end or in range
                                let isStartDate = this.dateRange.from && 
                                                this.isSameDay(cellDate, this.dateRange.from);
                                let isEndDate = this.dateRange.to && 
                                                this.isSameDay(cellDate, this.dateRange.to);
                                let isInRange = this.dateRange.from && this.dateRange.to && 
                                                cellDate > this.dateRange.from && cellDate < this.dateRange.to;
                                
                                if (isStartDate || isEndDate) {
                                    cellDiv.style.backgroundColor = '#0068B7';
                                    cellDiv.style.color = 'white';
                                } else if (isInRange) {
                                    cellDiv.style.backgroundColor = 'rgba(0, 104, 183, 0.2)';
                                }
                                
                                // Add click event for date selection
                                cellDiv.addEventListener('click', () => {
                                    if (cellDiv.classList.contains('disabled')) return;
                                    
                                    this.handleDateSelection(cellDate);
                                });
                            }
                            
                            cell.appendChild(cellDiv);
                            day++;
                        }
                        
                        row.appendChild(cell);
                    }
                    
                    tbody.appendChild(row);
                }
                
                table.appendChild(tbody);
                return table;
            },
            
            // Handle date selection
            handleDateSelection: function(date) {
                if (!this.isSelectingEndDate) {
                    // First selection
                    this.dateRange = { from: date, to: null };
                    this.isSelectingEndDate = true;
                } else {
                    // Second selection
                    if (date < this.dateRange.from) {
                        // If second date is before first, swap them
                        this.dateRange.to = this.dateRange.from;
                        this.dateRange.from = date;
                    } else {
                        this.dateRange.to = date;
                    }
                    this.isSelectingEndDate = false;
                }
                
                this.updateDisplayText();
                this.renderCalendar();
                
                // Update external dateRange variable if needed
                if (window.dateRange) {
                    window.dateRange = this.dateRange;
                }
            },
            
            // Check if two dates are the same day
            isSameDay: function(date1, date2) {
                return date1.getDate() === date2.getDate() &&
                       date1.getMonth() === date2.getMonth() &&
                       date1.getFullYear() === date2.getFullYear();
            },
            
            // Get the selected date range
            getDateRange: function() {
                return {
                    from: this.dateRange.from ? this.formatAPIDate(this.dateRange.from) : null,
                    to: this.dateRange.to ? this.formatAPIDate(this.dateRange.to) : null
                };
            }
        };
        
        // Initialize the DateRangePicker
        if (dateRangeButton && dateRangeDropdown && dateRangeText && dateRangeCalendar) {
            DateRangePicker.init('dateRangeButton', 'dateRangeDropdown', 'dateRangeText', 'dateRangeCalendar');
        }

        if (departureCityButton) {
            departureCityButton.addEventListener('click', function(e) {
                e.stopPropagation();
                // Close if already open, otherwise open it
                if (departureCityDropdown.classList.contains('show')) {
                    departureCityDropdown.classList.remove('show');
                } else {
                    closeAllDropdowns();
                    departureCityDropdown.classList.add('show');
                    initializeCityList();
                }
            });
        }

        if (tourTypeButton) {
            tourTypeButton.addEventListener('click', function(e) {
                e.stopPropagation();
                // Close if already open, otherwise open it
                if (tourTypeDropdown.classList.contains('show')) {
                    tourTypeDropdown.classList.remove('show');
                } else {
                    closeAllDropdowns();
                    tourTypeDropdown.classList.add('show');
                }
            });
        }

        if (passengersButton) {
            passengersButton.addEventListener('click', function(e) {
                e.stopPropagation();
                // Close if already open, otherwise open it
                if (passengersDropdown.classList.contains('show')) {
                    passengersDropdown.classList.remove('show');
                } else {
                    closeAllDropdowns();
                    passengersDropdown.classList.add('show');
                }
            });
        }

        // Tour Type Selection
        if (tourTypeList) {
            tourTypeList.querySelectorAll('li').forEach(item => {
                item.addEventListener('click', function() {
                    tourType = this.dataset.value;
                    tourTypeText.textContent = this.textContent;
                    tourTypeList.querySelectorAll('li').forEach(el => el.classList.remove('selected'));
                    this.classList.add('selected');
                    closeAllDropdowns();
                });
            });
        }

        // Passenger Controls
        if (adultsDecreaseBtn) {
            adultsDecreaseBtn.addEventListener('click', function() {
                if (passengers.adults > 1) {
                    passengers.adults--;
                    adultsCount.textContent = passengers.adults;
                    updatePassengersText();
                }
            });
        }

        if (adultsIncreaseBtn) {
            adultsIncreaseBtn.addEventListener('click', function() {
                passengers.adults++;
                adultsCount.textContent = passengers.adults;
                updatePassengersText();
            });
        }

        if (childrenDecreaseBtn) {
            childrenDecreaseBtn.addEventListener('click', function() {
                if (passengers.children > 0) {
                    passengers.children--;
                    childrenCount.textContent = passengers.children;
                    updatePassengersText();
                }
            });
        }

        if (childrenIncreaseBtn) {
            childrenIncreaseBtn.addEventListener('click', function() {
                passengers.children++;
                childrenCount.textContent = passengers.children;
                updatePassengersText();
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dts-tour-search-item')) {
                closeAllDropdowns();
            }
        });

        // Search Button
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                // Create query string for URL
                const params = new URLSearchParams();
                
                // Get date range from DateRangePicker if available
                const pickerDateRange = DateRangePicker.dateRange || dateRange;
                
                if (pickerDateRange.from) {
                    const formattedStartDate = formatAPIDate(pickerDateRange.from);
                    params.append('startDate', formattedStartDate);
                }
                
                if (pickerDateRange.to) {
                    const formattedEndDate = formatAPIDate(pickerDateRange.to);
                    params.append('endDate', formattedEndDate);
                }
                
                if (departureCity) params.append('departureCity', departureCity);
                params.append('adults', passengers.adults.toString());
                params.append('children', passengers.children.toString());
                params.append('tourType', tourType);

                // Navigate to our tour app subdomain with proper routing
                window.location.href = `https://trips.depart-travel-services.com/${tourType}?${params.toString()}`;
                
                // Function to format date as YYYY-MM-DD
                function formatAPIDate(date) {
                    const d = new Date(date);
                    let month = '' + (d.getMonth() + 1);
                    let day = '' + d.getDate();
                    const year = d.getFullYear();
                    
                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;
                    
                    return [year, month, day].join('-');
                }
            });
        }
    });
    </script>
</body>
</html>