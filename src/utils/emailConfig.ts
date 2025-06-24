// EmailJS Configuration
export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_thy4hfj',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_d0lvtr9',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'ZIxFb9TY2-bjZWZm9',
};

// EmailJS Setup Instructions:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and verify your email
// 3. Create a new service (Gmail, Outlook, etc.)
// 4. Create a new template with the following variables:
//    - {{from_name}} - sender's name
//    - {{from_email}} - sender's email
//    - {{subject}} - email subject
//    - {{message}} - email message
//    - {{to_email}} - recipient email (georgiogelias@gmail.com)
// 5. Get your service ID, template ID, and public key
// 6. Add them to your .env file:
//    VITE_EMAILJS_SERVICE_ID=your_service_id
//    VITE_EMAILJS_TEMPLATE_ID=your_template_id
//    VITE_EMAILJS_PUBLIC_KEY=your_public_key 