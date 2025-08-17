/**
 * Force Rich Text Editor for Full Description
 * This script directly injects the rich text editor into any textarea with description-related names
 */

(function() {
    'use strict';

    console.log('🎨 Force Rich Text Editor starting...');

    let initAttempts = 0;
    const maxAttempts = 100;

    function injectRichTextStyles() {
        if (document.getElementById('force-rich-text-styles')) return;

        const style = document.createElement('style');
        style.id = 'force-rich-text-styles';
        style.textContent = `
            .force-rich-container {
                border: 2px solid #007bff;
                border-radius: 8px;
                background: white;
                margin: 10px 0;
            }

            .force-rich-toolbar {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px;
                background: #f8f9fa;
                border-bottom: 2px solid #007bff;
                border-radius: 6px 6px 0 0;
                flex-wrap: wrap;
            }

            .force-toolbar-group {
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .force-toolbar-separator {
                width: 1px;
                height: 20px;
                background: #ddd;
                margin: 0 8px;
            }

            .force-toolbar-btn {
                background: white;
                border: 2px solid #007bff;
                border-radius: 4px;
                padding: 8px 12px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 14px;
                font-weight: 600;
                color: #007bff;
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 36px;
                height: 36px;
            }

            .force-toolbar-btn:hover {
                background: #007bff;
                color: white;
                transform: translateY(-1px);
            }

            .force-toolbar-btn.active {
                background: #007bff;
                color: white;
            }

            .force-toolbar-select {
                padding: 10px 16px;
                border: 2px solid #007bff;
                border-radius: 4px;
                background: white;
                font-size: 14px;
                height: 44px;
                line-height: 1.2;
                color: #007bff;
                font-weight: 600;
                min-width: 120px;
                width: auto;
                cursor: pointer;
                white-space: nowrap;
                overflow: visible;
                vertical-align: middle;
                box-sizing: border-box;
                display: inline-block;
            }

            .force-color-btn {
                min-width: 120px !important;
                white-space: nowrap;
            }

            .force-color-input {
                width: 36px;
                height: 36px;
                border: none;
                cursor: pointer;
                opacity: 0;
                position: absolute;
            }

            .force-rich-editor {
                min-height: 250px;
                padding: 20px;
                outline: none;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 16px;
                line-height: 1.6;
                border-radius: 0 0 6px 6px;
                background: white;
            }

            .force-rich-editor:focus {
                box-shadow: inset 0 0 0 3px rgba(0,123,255,0.25);
            }

            .force-rich-editor p {
                margin-bottom: 1rem;
            }

            .force-rich-editor h1, .force-rich-editor h2, .force-rich-editor h3 {
                margin: 1.5rem 0 1rem 0;
                font-weight: 600;
            }

            .force-rich-editor h1 { font-size: 2rem; color: #007bff; }
            .force-rich-editor h2 { font-size: 1.5rem; color: #0056b3; }
            .force-rich-editor h3 { font-size: 1.25rem; color: #004085; }

            .force-rich-editor ul, .force-rich-editor ol {
                margin: 1rem 0;
                padding-left: 2rem;
            }

            .force-rich-editor li {
                margin-bottom: 0.5rem;
            }

            .force-rich-editor a {
                color: #007bff;
                text-decoration: underline;
                font-weight: 600;
            }

            .force-rich-editor blockquote {
                border-left: 4px solid #007bff;
                padding-left: 1rem;
                margin: 1rem 0;
                font-style: italic;
                color: #666;
                background: #f8f9ff;
                padding: 15px;
                border-radius: 0 8px 8px 0;
            }

            .force-rich-tips {
                background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
                border: 2px solid #2196f3;
                border-radius: 8px;
                padding: 15px;
                margin: 15px 0;
                font-size: 14px;
                color: #0d47a1;
            }

            .force-rich-tips strong {
                color: #0d47a1;
                font-weight: 700;
            }

            .force-rich-tips ul {
                margin: 10px 0;
                padding-left: 20px;
            }

            .force-rich-tips li {
                margin-bottom: 8px;
            }

            .ql-editor {
                min-height: 200px;
                max-height: 400px;
                font-size: 14px;
                line-height: 1.6;
                overflow-y: auto;
                word-wrap: break-word;
                overflow-wrap: break-word;
                white-space: pre-wrap;
            }

            .ql-toolbar {
                border-top: 1px solid #ccc;
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                position: relative;
                z-index: 1;
            }

            .ql-container {
                border-bottom: 1px solid #ccc;
                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;
                position: relative;
                z-index: 1;
            }

            .form-group {
                margin-bottom: 1.5rem;
                clear: both;
                overflow: hidden;
            }

            .rich-text-container {
                position: relative;
                z-index: 1;
                width: 100%;
                max-width: 100%;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }

    function enhanceTextarea(textarea) {
        if (textarea.classList.contains('force-rich-enhanced')) return;

        console.log('🎨 Enhancing textarea:', textarea.id || textarea.name || 'unnamed');

        textarea.classList.add('force-rich-enhanced');

        const container = document.createElement('div');
        container.className = 'force-rich-container';
        container.innerHTML = `
            <div class="force-rich-toolbar">
                <div class="force-toolbar-group">
                    <button type="button" class="force-toolbar-btn" data-command="bold" title="Bold (Ctrl+B)">
                        <strong>B</strong>
                    </button>
                    <button type="button" class="force-toolbar-btn" data-command="italic" title="Italic (Ctrl+I)">
                        <em>I</em>
                    </button>
                    <button type="button" class="force-toolbar-btn" data-command="underline" title="Underline (Ctrl+U)">
                        <u>U</u>
                    </button>
                </div>

                <div class="force-toolbar-separator"></div>

                <div class="force-toolbar-group">
                    <select class="force-toolbar-select" data-command="formatBlock" title="Text Style">
                        <option value="">Text Style</option>
                        <option value="<h1>">Title (H1)</option>
                        <option value="<h2>">Heading (H2)</option>
                        <option value="<h3>">Subheading (H3)</option>
                        <option value="<p>">Paragraph</option>
                        <option value="<blockquote>">Quote</option>
                    </select>
                    <select class="force-toolbar-select" data-command="fontSize" title="Font Size">
                        <option value="">Font Size</option>
                        <option value="1">Very Small</option>
                        <option value="2">Small</option>
                        <option value="3">Normal</option>
                        <option value="4">Medium</option>
                        <option value="5">Large</option>
                        <option value="6">Very Large</option>
                        <option value="7">Huge</option>
                    </select>
                    <button type="button" class="force-toolbar-btn force-color-btn" data-command="foreColor" title="Text Color">
                        🎨 Text Color
                    </button>
                    <input type="color" class="force-color-input" style="display: none;" value="#000000">
                </div>

                <div class="force-toolbar-separator"></div>

                <div class="force-toolbar-group">
                    <button type="button" class="force-toolbar-btn" data-command="justifyLeft" title="Align Left">
                        ⬅
                    </button>
                    <button type="button" class="force-toolbar-btn" data-command="justifyCenter" title="Align Center">
                        ↔
                    </button>
                    <button type="button" class="force-toolbar-btn" data-command="justifyRight" title="Align Right">
                        ➡
                    </button>
                    <button type="button" class="force-toolbar-btn" data-command="justifyFull" title="Justify">
                        ⬌
                    </button>
                </div>

                <div class="force-toolbar-separator"></div>

                <div class="force-toolbar-group">
                    <button type="button" class="force-toolbar-btn" data-command="insertUnorderedList" title="Bullet List">
                        • List
                    </button>
                    <button type="button" class="force-toolbar-btn" data-command="insertOrderedList" title="Numbered List">
                        1. List
                    </button>
                </div>

                <div class="force-toolbar-separator"></div>

                <div class="force-toolbar-group">
                    <button type="button" class="force-toolbar-btn" data-command="createLink" title="Insert Link (Ctrl+K)">
                        🔗 Link
                    </button>
                    <button type="button" class="force-toolbar-btn" data-command="unlink" title="Remove Link">
                        🔓 Unlink
                    </button>
                </div>

                <div class="force-toolbar-separator"></div>

                <div class="force-toolbar-group">
                    <button type="button" class="force-toolbar-btn" data-command="removeFormat" title="Clear Formatting">
                        🧹 Clear
                    </button>
                    <button type="button" class="force-toolbar-btn" data-command="undo" title="Undo (Ctrl+Z)">
                        ↶ Undo
                    </button>
                    <button type="button" class="force-toolbar-btn" data-command="redo" title="Redo (Ctrl+Y)">
                        ↷ Redo
                    </button>
                </div>
            </div>

            <div class="force-rich-editor" contenteditable="true" id="${textarea.id}_rich_editor">
                ${textarea.value || '<p style="color: #999; font-style: italic;" class="placeholder-text">Click here to start writing your tour description...</p>'}
            </div>
        `;

        textarea.style.display = 'none';
        textarea.parentNode.insertBefore(container, textarea);

        // Tips section removed per user request

        // Bind events
        bindRichTextEvents(textarea.id);
    }

    function bindRichTextEvents(textareaId) {
        const editor = document.getElementById(`${textareaId}_rich_editor`);
        const textarea = document.getElementById(textareaId);
        const toolbar = editor.parentNode.querySelector('.force-rich-toolbar');

        if (!editor || !textarea || !toolbar) return;

        // Toolbar button clicks
        toolbar.addEventListener('click', (e) => {
            if (e.target.closest('.force-toolbar-btn')) {
                e.preventDefault();
                const btn = e.target.closest('.force-toolbar-btn');
                const command = btn.dataset.command;

                if (command === 'createLink') {
                    const selection = window.getSelection();
                    const selectedText = selection.toString();

                    const url = prompt('Enter the URL for the link:', 'https://');
                    if (url && url !== 'https://') {
                        if (selectedText) {
                            document.execCommand('createLink', false, url);
                        } else {
                            const linkText = prompt('Enter the text for the link:', 'Click here');
                            if (linkText) {
                                const link = `<a href="${url}" style="color: #007bff; font-weight: 600;">${linkText}</a>`;
                                document.execCommand('insertHTML', false, link);
                            }
                        }
                    }
                } else {
                    document.execCommand(command, false, null);
                }

                editor.focus();
                updateToolbarState();
                syncContent();
            }
        });

        // Select changes
        toolbar.addEventListener('change', (e) => {
            if (e.target.classList.contains('force-toolbar-select')) {
                const command = e.target.dataset.command;
                const value = e.target.value;

                if (value) {
                    document.execCommand(command, false, value);
                    e.target.value = '';
                }

                editor.focus();
                updateToolbarState();
                syncContent();
            }
        });

        // Color button click
        toolbar.addEventListener('click', (e) => {
            if (e.target.closest('.force-color-btn')) {
                e.preventDefault();
                const colorInput = toolbar.querySelector('.force-color-input');
                colorInput.click();
            }
        });

        // Color input changes
        toolbar.addEventListener('change', (e) => {
            if (e.target.classList.contains('force-color-input')) {
                const color = e.target.value;
                document.execCommand('foreColor', false, color);
                editor.focus();
                syncContent();
            }
        });

        // Editor focus to clear placeholder
        editor.addEventListener('focus', () => {
            const placeholder = editor.querySelector('.placeholder-text');
            if (placeholder) {
                editor.innerHTML = '<p><br></p>';
                syncContent();
            }
        });

        // Editor content changes
        editor.addEventListener('input', () => {
            syncContent();
            updateToolbarState();
        });

        // Keyboard shortcuts
        editor.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault();
                        document.execCommand('bold');
                        syncContent();
                        break;
                    case 'i':
                        e.preventDefault();
                        document.execCommand('italic');
                        syncContent();
                        break;
                    case 'u':
                        e.preventDefault();
                        document.execCommand('underline');
                        syncContent();
                        break;
                    case 'k':
                        e.preventDefault();
                        const url = prompt('Enter the URL:', 'https://');
                        if (url && url !== 'https://') {
                            const linkText = prompt('Enter link text:', 'Click here');
                            if (linkText) {
                                const link = `<a href="${url}" style="color: #007bff;">${linkText}</a>`;
                                document.execCommand('insertHTML', false, link);
                            }
                        }
                        break;
                }
            }
        });

        function updateToolbarState() {
            const commands = ['bold', 'italic', 'underline', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];
            commands.forEach(command => {
                const btn = toolbar.querySelector(`[data-command="${command}"]`);
                if (btn) {
                    btn.classList.toggle('active', document.queryCommandState(command));
                }
            });
        }

        function syncContent() {
            textarea.value = editor.innerHTML;

            // Trigger change event for React/form libraries
            const event = new Event('input', { bubbles: true });
            textarea.dispatchEvent(event);
        }

        // Initial sync
        syncContent();
    }

    function findAndEnhanceTextareas() {
        initAttempts++;
        console.log(`🔍 Searching for PHP page generator full description textarea (attempt ${initAttempts}/${maxAttempts})`);

        // Look for full description textarea with multiple possible selectors
        let targetTextarea = document.querySelector('textarea[name="full_description"]') || 
                           document.querySelector('textarea[id="full_description"]') ||
                           document.querySelector('#full_description') ||
                           document.querySelector('textarea[placeholder*="description"]') ||
                           document.querySelector('textarea[placeholder*="Description"]');

        // Double-check that this textarea is within a form context (not just any textarea with this name)
        if (targetTextarea) {
            const form = targetTextarea.closest('form');
            const modal = targetTextarea.closest('.modal') || targetTextarea.closest('[style*="position: fixed"]');

            // Only proceed if it's within a form or modal context (PHP page generator)
            if (!form && !modal) {
                targetTextarea = null;
            }
        }

        if (targetTextarea && !targetTextarea.classList.contains('force-rich-enhanced')) {
            console.log('✅ Found PHP page generator full description textarea');
            enhanceTextarea(targetTextarea);
            console.log('🎉 Rich text editor applied to full description field only!');
        } else if (initAttempts < maxAttempts) {
            setTimeout(findAndEnhanceTextareas, 1000);
        } else {
            console.log('❌ PHP page generator full description textarea not found after maximum attempts');
        }
    }

    // Inject styles first
    injectRichTextStyles();

    // Start searching immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', findAndEnhanceTextareas);
    } else {
        findAndEnhanceTextareas();
    }

    // Also try when window loads
    window.addEventListener('load', () => {
        setTimeout(findAndEnhanceTextareas, 500);
    });

    // Monitor for new content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                const hasTextarea = Array.from(mutation.addedNodes).some(node => 
                    node.nodeType === 1 && (
                        node.tagName === 'TEXTAREA' || 
                        node.querySelector('textarea')
                    )
                );
                if (hasTextarea) {
                    setTimeout(findAndEnhanceTextareas, 300);
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();