// src/components/Contact/Contact.tsx
import React, { useRef, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  FormControl, // Form components
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast, // For feedback messages
  useBreakpointValue,
  type ResponsiveValue,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa'; // Import email and send icon

// MODIFIED: Declare module augmentation for React.CSSProperties
declare module 'react' {
  interface CSSProperties {
    '--rotateX'?: string;
    '--rotateY'?: string;
  }
}

// Define colors based on your preferred dark theme palette
const primaryTextColor = "#E2E8F0"; // Soft white/light gray for main text
const secondaryTextColor = "#A0AEC0"; // Medium gray for subtle text
const accentColor = "#63B3ED"; // Bright blue for highlights/icons
const inputBorderColor = "rgba(255, 255, 255, 0.3)"; // Subtle border for inputs
const inputFocusBorderColor = accentColor; // Accent color on focus

// MODIFIED: Wrap component with forwardRef to accept ref from App.tsx
const Contact = React.forwardRef((_props, ref) => {
  type TextAlign = "left" | "center" | "right" | "justify" | undefined;
  const textAlign: ResponsiveValue<TextAlign> = useBreakpointValue({ base: 'center', md: 'center' });
  const headingAlign: ResponsiveValue<TextAlign> = useBreakpointValue({ base: 'center', md: 'center' });

  const toast = useToast(); // Initialize Chakra UI toast for feedback

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // MODIFIED: Form submission endpoint now points to your Netlify Function
  const formSubmissionEndpoint = "/api/contact-form"; // This is the endpoint for your Netlify Function

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // MODIFIED: Send data to your Netlify Function endpoint
      const response = await fetch(formSubmissionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        // Handle errors from the Netlify Function or Formspree
        const data = await response.json();
        const errorMessage = data.message || "Something went wrong. Please try again.";
        console.error("Form submission failed:", data);
        toast({
          title: "Error sending message.",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Network or unexpected error during form submission:", error);
      toast({
        title: "Network error.",
        description: "Could not connect to the server. Please check your internet connection.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Optional: Add tilt effect logic if you want the contact box to tilt
  type CardRotationState = {
    [cardKey: string]: { rotateX: string; rotateY: string };
  };
  const [cardRotations, setCardRotations] = useState<CardRotationState>({});
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>, cardKey: string) => {
    const card = cardRefs.current[cardKey];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 3;
    const rotateX = ((y - midY) / midY) * -3;

    setCardRotations(prev => ({
      ...prev,
      [cardKey]: { rotateX: `${rotateX}deg`, rotateY: `${rotateY}deg` }
    }));
  };

  const handleCardMouseLeave = (cardKey: string) => {
    setCardRotations(prev => ({
      ...prev,
      [cardKey]: { rotateX: '0deg', rotateY: '0deg' }
    }));
  };

  return (
    <Box
      id="contact"
      ref={ref}
      className="contact-section-container"
      color={primaryTextColor}
      style={{
        '--rotateX': cardRotations['contact-box']?.rotateX || '0deg',
        '--rotateY': cardRotations['contact-box']?.rotateY || '0deg',
      }}
      onMouseMove={(e) => handleCardMouseMove(e, 'contact-box')}
      onMouseLeave={() => handleCardMouseLeave('contact-box')}
    >
      <VStack className="contact-content-stack" align={headingAlign}>
        <Heading
          as="h2"
          className="contact-main-heading"
          textAlign={headingAlign}
        >
          Get in Touch
        </Heading>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={secondaryTextColor}
          textAlign={textAlign}
          maxW="container.md"
        >
          I'm always open to new opportunities and collaborations. Feel free to reach out!
        </Text>

        {/* --- Contact Form --- */}
        <Box as="form" onSubmit={handleSubmit} width="full" maxW="container.sm" mt={8}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel className="form-label" color={secondaryTextColor}>Your Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="John Doe"
                borderColor={inputBorderColor}
                _hover={{ borderColor: inputBorderColor }}
                _focus={{ borderColor: inputFocusBorderColor, boxShadow: `0 0 0 1px ${inputFocusBorderColor}` }}
                color={primaryTextColor}
                bg="rgba(255,255,255,0.05)"
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel className="form-label" color={secondaryTextColor}>Your Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="john.doe@example.com"
                borderColor={inputBorderColor}
                _hover={{ borderColor: inputBorderColor }}
                _focus={{ borderColor: inputFocusBorderColor, boxShadow: `0 0 0 1px ${inputFocusBorderColor}` }}
                color={primaryTextColor}
                bg="rgba(255,255,255,0.05)"
              />
            </FormControl>

            <FormControl id="message" isRequired>
              <FormLabel className="form-label" color={secondaryTextColor}>Message</FormLabel>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell me about your project or inquiry..."
                size="md"
                rows={6}
                borderColor={inputBorderColor}
                _hover={{ borderColor: inputBorderColor }}
                _focus={{ borderColor: inputFocusBorderColor, boxShadow: `0 0 0 1px ${inputFocusBorderColor}` }}
                color={primaryTextColor}
                bg="rgba(255,255,255,0.05)"
              />
            </FormControl>

            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Sending..."
              colorScheme="blue"
              size="lg"
              rightIcon={<FaPaperPlane />}
              className="form-submit-button"
              width={{ base: "full", md: "auto" }}
              alignSelf={textAlign === 'center' ? 'center' : 'flex-start'}
            >
              Send Message
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
});

export default Contact;
