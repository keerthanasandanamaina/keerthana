import { Box, Text, VStack, HStack, Link, Icon } from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Footer.css';

const secondaryTextColor = "#A0AEC0";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contactInfo = {
    phone: "+1 (561) 816-0452",
    email: "ksandanamain2023@fau.edu",
    linkedin: "keerthana-sandanamaina",
    github: "keerthanasandanamaina",
  };

  return (
    <Box as="footer" className="footer-container" color={secondaryTextColor}>
      <VStack spacing={4} className="footer-content-stack">
        <Text fontSize={{ base: "sm", md: "md" }} className="footer-copyright-text">
          &copy; {currentYear} Keerthana Sandanamaina. All rights reserved.
        </Text>
        <HStack spacing={{ base: 4, md: 6 }} className="footer-social-links">
          <Link href={`https://linkedin.com/in/${contactInfo.linkedin}`} isExternal className="footer-link-item">
            <Icon as={FaLinkedin} />
            <Text display={{ base: "none", sm: "block" }}>LinkedIn</Text>
          </Link>
          <Link href={`https://github.com/${contactInfo.github}`} isExternal className="footer-link-item">
            <Icon as={FaGithub} />
            <Text display={{ base: "none", sm: "block" }}>GitHub</Text>
          </Link>
          <Link href={`mailto:${contactInfo.email}`} isExternal className="footer-link-item">
            <Icon as={FaEnvelope} />
            <Text display={{ base: "none", sm: "block" }}>Email</Text>
          </Link>
          <Link href={`tel:${contactInfo.phone}`} isExternal className="footer-link-item">
            <Icon as={FaPhone} />
            <Text display={{ base: "none", sm: "block" }}>Phone</Text>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Footer;
