console.log("Email is working fine!!!")

function createAIbutton(){
   const button = document.createElement('div');
   button.className = 'T-I J-35-Ji aoO v7 T-I-atl L3';
   button.style.marginRight = '8px';
   button.innerHTML = 'AI Reply';
   button.setAttribute('role', 'button');
   button.setAttribute('data-tooltip', 'Generate AI Reply');
   return button;
}

// Updated function to find compose box with multiple selectors
function findComposeBox() {
    const selectors = [
        '[role="textbox"][g-editable="true"]',
        '.Am.Al.editable',
        '[contenteditable="true"][role="textbox"]',
        '.editable[role="textbox"]',
        'div[contenteditable="true"]',
        '.Am.Al.editable.LW-avf',
        '[aria-label="Message Body"]'
    ];
    
    for (const selector of selectors) {
        const box = document.querySelector(selector);
        if (box) {
            console.log("Found compose box with selector:", selector);
            return box;
        }
    }
    console.log("No compose box found with any selector");
    return null;
}

// Updated email content extraction with better selectors
function getEmailContent(){
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.ii.gt .a3s.aiL',
        '[role="listitem"] .a3s',
        '.gmail_quote',
        '[role="presentation"]'
    ];
    
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content && content.textContent.trim()) {
            console.log("Found email content with selector:", selector);
            return content.textContent.trim();
        }
    }
    
    // Fallback: get any email text
    const fallback = document.querySelector('[role="main"] .a3s');
    if (fallback && fallback.textContent.trim()) {
        console.log("Using fallback email content");
        return fallback.textContent.trim();
    }
    
    console.log("No email content found, using default");
    return "Please reply to this email";
}

function findComposeToolbar(){
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    
    for (const selector of selectors) {
       const toolbar = document.querySelector(selector);
       if(toolbar){
        console.log("Found toolbar with selector:", selector);
        return toolbar;
       }
    }
    console.log("No toolbar found");
    return null;
}

// Debug function to see all available compose boxes
function debugComposeBoxes() {
    console.log("=== Debugging Compose Boxes ===");
    const allEditables = document.querySelectorAll('[contenteditable="true"]');
    console.log("Found contenteditable elements:", allEditables.length);
    
    allEditables.forEach((el, index) => {
        console.log(`Element ${index}:`, el.className, el.getAttribute('role'), el.getAttribute('aria-label'));
    });
    
    const textboxes = document.querySelectorAll('[role="textbox"]');
    console.log("Found textbox elements:", textboxes.length);
    
    textboxes.forEach((el, index) => {
        console.log(`Textbox ${index}:`, el.className, el.getAttribute('contenteditable'));
    });
}

function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');
    if(existingButton) existingButton.remove();
    
    const toolbar = findComposeToolbar();
    if(!toolbar){
        console.log("Toolbar not found");
        return;
    }
    
    console.log("Toolbar found");
    const button = createAIbutton();
    button.classList.add('ai-reply-button');
    
    button.addEventListener('click', async () => {
        console.log("Button clicked!");
        
        // Debug compose boxes when button is clicked
        debugComposeBoxes();
        
        try {
            button.innerHTML = 'Generating..';
            button.disabled = true;
            
            const emailContent = getEmailContent();
            console.log("Email content extracted:", emailContent);
            
            if (!emailContent || emailContent === "Please reply to this email") {
                console.log("No meaningful email content found");
            }
            
            console.log("Making API request...");
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });
            
            console.log("API Response status:", response.status);
            console.log("API Response ok:", response.ok);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.log("Error response:", errorText);
                throw new Error(`API failed: ${response.status} - ${errorText}`);
            }
            
            const generatedReply = await response.text();
            console.log("Generated reply:", generatedReply);
            
            // Try multiple ways to insert text
            const composeBox = findComposeBox();
            
            if (composeBox) {
                console.log("Compose box found, inserting text");
                
                // Method 1: Focus and clear first
                composeBox.focus();
                
                // Method 2: Try innerHTML
                composeBox.innerHTML = generatedReply;
                
                // Method 3: Try execCommand as fallback
                if (!composeBox.innerHTML.includes(generatedReply.substring(0, 20))) {
                    document.execCommand('selectAll', false, null);
                    document.execCommand('insertText', false, generatedReply);
                }
                
                // Method 4: Trigger events to make Gmail recognize the change
                const inputEvent = new Event('input', { bubbles: true });
                const changeEvent = new Event('change', { bubbles: true });
                composeBox.dispatchEvent(inputEvent);
                composeBox.dispatchEvent(changeEvent);
                
                console.log("Text insertion completed");
            } else {
                console.log("No compose box found, showing alert");
                alert("Generated Reply:\n\n" + generatedReply);
            }
            
        } catch (error) {
            console.error("Complete error:", error);
            console.error("Error stack:", error.stack);
            alert('Error: ' + error.message);
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });
    
    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations){
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElement = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );
        if(hasComposeElement){
            console.log("Compose Window Detected");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Also try to inject button on page load
setTimeout(() => {
    console.log("Trying to inject button on page load");
    injectButton();
}, 2000);