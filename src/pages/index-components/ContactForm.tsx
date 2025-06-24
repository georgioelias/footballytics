import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailConfig } from '@/utils/emailConfig';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const { serviceId, templateId, publicKey } = emailConfig;

      // Template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'georgiogelias@gmail.com'
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      toast.success('✅ Message sent successfully! We\'ll get back to you within 24 hours.', { duration: 5000 });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Email sending error:', error);
      
      // Fallback to mailto if EmailJS fails
      const subject = encodeURIComponent(`Footballytics Contact: ${formData.subject}`);
      const body = encodeURIComponent(
        `Hello,\n\nYou have received a new message from your Footballytics website:\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `---\nSent via Footballytics Contact Form`
      );
      const mailtoLink = `mailto:georgiogelias@gmail.com?subject=${subject}&body=${body}`;
      
      window.open(mailtoLink, '_blank');
      toast.error('Direct email failed. Opening your email client as backup.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Mail className="h-6 w-6 text-green-600" />
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <Input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What is this about?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your inquiry..."
                rows={5}
              />
            </div>
            
            <div className="text-center">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-500">
                📧 Direct email delivery!
              </p>
              <p className="text-xs text-gray-400">
                Sent directly to: georgiogelias@gmail.com • Response within 24 hours! ⚽
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
