import React from 'react';
import {
  Flex,
  Heading,
  Button,
  HStack,
  Link,
  Icon,
  Text as ChakraText,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaDownload } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const primaryTextColor = "#E2E8F0";
  const secondaryTextColor = "#A0AEC0";

  const contactInfo = {
    phone: "+1 (561) 816-0452",
    email: "ksandanamain2023@fau.edu",
    linkedin: "keerthana-sandanamaina",
    github: "keerthanasandanamaina",
  };

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Profile Section", href: "#profile" },
    { label: "Resume", href: "/Keerthana_Sandanamaina_Resume.pdf", isDownload: true },
  ];

  const [activeItem, setActiveItem] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profileImageUrl = "images/photo.png";
  const profileThumbnailUrl = "images/photo.png";
  const modalDescription = "Entry-Level Data Analyst passionate about transforming complex data into actionable insights and enhancing digital safety.";

  return (
    <Flex
      as="nav"
      className="navbar-container"
      position="fixed"
      top={4}
      left="50%"
      transform="translateX(-50%)"
      zIndex="sticky"
    >
      <Flex direction={{ base: "column", md: "row" }} alignItems={{ base: "center", md: "center" }} flexShrink={0} className="navbar-left-content">
        <Image
          borderRadius="full"
          boxSize={{ base: "40px", md: "48px" }}
          src={profileThumbnailUrl}
          alt="Keerthana Sandanamaina Profile"
          fallbackSrc="https://placehold.co/48x48/7960e6/ffffff?text=KS"
          mr={{ base: 0, md: 3 }}
          mb={{ base: 2, md: 0 }}
          className="profile-avatar"
          cursor="pointer"
          onClick={onOpen}
        />
        <Flex direction="column" alignItems={{ base: "center", md: "flex-start" }}>
          <Heading
            as="h1"
            className="navbar-name-heading"
            color={primaryTextColor}
          >
            Keerthana Sandanamaina
          </Heading>
          <HStack className="navbar-contact-links" justify={{ base: "center", md: "flex-start" }} mt={{ base: 2, md: 0 }}>
            <Link href={`tel:${contactInfo.phone}`} isExternal className="contact-link-item">
              <Icon as={FaPhone} />
              <ChakraText display={{ base: "none", md: "block" }}>{contactInfo.phone}</ChakraText>
            </Link>
            <Link href={`mailto:${contactInfo.email}`} isExternal className="contact-link-item">
              <Icon as={FaEnvelope} />
              <ChakraText display={{ base: "none", md: "block" }}>{contactInfo.email}</ChakraText>
            </Link>
            <Link href={`https://linkedin.com/in/${contactInfo.linkedin}`} isExternal className="contact-link-item">
              <Icon as={FaLinkedin} />
              <ChakraText display={{ base: "none", md: "block" }}>LinkedIn</ChakraText>
            </Link>
            <Link href={`https://github.com/${contactInfo.github}`} isExternal className="contact-link-item">
              <Icon as={FaGithub} />
              <ChakraText display={{ base: "none", md: "block" }}>GitHub</ChakraText>
            </Link>
          </HStack>
        </Flex>
      </Flex>
      <HStack className="navbar-nav-stack">
        {navItems.map((item) => (
          <Button
            key={item.label}
            as="a"
            href={item.href}
            download={item.isDownload ? item.label : undefined}
            target={item.isDownload ? "_blank" : undefined}
            className="navbar-nav-button"
            variant={activeItem === item.label ? "solid" : "ghost"}
            colorScheme={activeItem === item.label ? "blue" : undefined}
            color={activeItem === item.label ? "white" : primaryTextColor}
            _hover={{
              bg: activeItem === item.label ? "blue.600" : "whiteAlpha.200",
              color: "white",
            }}
            _active={{
              bg: "blue.700",
            }}
            onClick={() => setActiveItem(item.label)}
            borderColor={activeItem === item.label ? "blue.600" : "whiteAlpha.300"}
          >
            {item.isDownload && <Icon as={FaDownload} mr={2} />}
            {item.label}
          </Button>
        ))}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent
          maxW={{ base: "90%", sm: "md", md: "lg" }}
          bg="rgba(255, 255, 255, 0.15)"
          backdropFilter="blur(10px) saturate(180%)"
          borderRadius="lg"
          boxShadow="dark-lg"
          border="1px solid rgba(255, 255, 255, 0.2)"
          py={4}
        >
          <ModalHeader color={primaryTextColor} textAlign="center">Keerthana Sandanamaina</ModalHeader>
          <ModalCloseButton color={primaryTextColor} />
          <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center" pb={6}>
            <Image
              src={profileImageUrl}
              alt="Keerthana Sandanamaina Full Profile"
              borderRadius="lg"
              maxH="80vh"
              maxW="100%"
              objectFit="contain"
              fallbackSrc="https://placehold.co/400x400/7960e6/ffffff?text=Image+Not+Found"
              mb={4}
            />
            <ChakraText fontSize="md" color={secondaryTextColor} textAlign="center">
              {modalDescription}
            </ChakraText>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;
