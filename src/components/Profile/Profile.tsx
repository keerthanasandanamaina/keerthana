import React, { useRef, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  useBreakpointValue,
  type ResponsiveValue,
} from '@chakra-ui/react';
import {
  FaCertificate, FaUsers
} from 'react-icons/fa';
import './Profile.css';

declare module 'react' {
  interface CSSProperties {
    '--rotateX'?: string;
    '--rotateY'?: string;
  }
}

const primaryTextColor = "#E2E8F0";
const secondaryTextColor = "#A0AEC0";
const accentColor = "#63B3ED";

const Profile = () => {
  type TextAlign = "left" | "center" | "right" | "justify" | undefined;
  const textAlign: ResponsiveValue<TextAlign> = useBreakpointValue({ base: 'center', md: 'left' });
  const headingAlign: ResponsiveValue<TextAlign> = useBreakpointValue({ base: 'center', md: 'left' });

  const certifications = [
    "Project Management Principles and Practices (University of California, May 2023)",
    "Data Science Applications and Opportunities (IEEE Student Branch, July 2023)",
    "SQL (Basic) Skills Certificate (Hackerrank)",
    "Insights of Blockchain and Career Opportunities (IEEE Student Branch (August 2022))",
    "Python for Everybody (University of Michigan on Coursera, May 2021)",
  ];

  const leadershipExtracurricular = [
    {
      role: "National Cadet Corps (NCC)",
      years: "2019-2022",
      description: "Certified B & C NCC Cadet; actively participated in volunteer activities, leadership camps, and state-level competitions, demonstrating teamwork, discipline, and commitment. Contributed to multiple social initiatives and community events.",
      icon: FaUsers,
    },
    {
      role: "Hyderabad Youth Assembly X - Director",
      years: "2019-2020",
      description: "Led organization's operations, facilitating discussions on Sustainable Development goals. Successfully managed projects during COVID-19 lockdown, demonstrating adaptability and effective remote leadership. Coordinated 'Run for a Cause 6.0' fundraising event.",
      icon: FaUsers,
    },
    {
      role: "Executive Member (Head of Operations) of Street Cause Francis",
      years: "2019-2020",
      description: "Oversaw operations and logistics for community service projects targeting poverty relief and healthcare amid the COVID-19 crisis. Recruited and led volunteer teams, enhancing project execution efficiency and expanding community outreach.",
      icon: FaUsers,
    },
    {
      role: "Vrikshit Foundation NGO - Volunteer",
      years: "2018-2020",
      description: "Participated in large-scale environmental projects including clean-up drives, afforestation efforts, and urban waste segregation. Assisted in converting dump yards into community assets such as libraries and parks. Supported awareness campaigns.",
      icon: FaUsers,
    },
  ];

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

    const rotateY = ((x - midX) / midX) * 5;
    const rotateX = ((y - midY) / midY) * -5;

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
      id="profile"
      className="profile-section-container"
      color={primaryTextColor}
    >
      <VStack className="profile-content-stack" align={headingAlign}>
        <Heading
          as="h2"
          className="profile-main-heading"
          textAlign={headingAlign}
        >
          My Profile & Background
        </Heading>
        <VStack className="profile-certifications" align={headingAlign} spacing={6}>
          <Heading as="h3" size="lg" className="profile-section-heading" textAlign={headingAlign}>
            Certifications
          </Heading>
          <VStack align={textAlign === 'center' ? 'center' : 'flex-start'} spacing={2}>
            {certifications.map((cert, index) => (
              <HStack
                key={index}
                spacing={2}
                className="profile-certification-item"
                ref={el => cardRefs.current[`cert-${index}`] = el as HTMLElement | null}
                style={{
                  '--rotateX': cardRotations[`cert-${index}`]?.rotateX || '0deg',
                  '--rotateY': cardRotations[`cert-${index}`]?.rotateY || '0deg',
                }}
                onMouseMove={(e) => handleCardMouseMove(e, `cert-${index}`)}
                onMouseLeave={() => handleCardMouseLeave(`cert-${index}`)}
              >
                <Icon as={FaCertificate} color={accentColor} />
                <Text fontSize="md" color={secondaryTextColor}>{cert}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
        <VStack className="profile-leadership" align={headingAlign} spacing={6}>
          <Heading as="h3" size="lg" className="profile-section-heading" textAlign={headingAlign}>
            Leadership & Extracurricular
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 6, md: 8 }} width="full" maxW="container.lg" mx="auto">
            {leadershipExtracurricular.map((item, index) => (
              <Box
                key={index}
                ref={el => cardRefs.current[`lead-${index}`] = el as HTMLElement | null}
                className="profile-card"
                textAlign={textAlign}
                style={{
                  '--rotateX': cardRotations[`lead-${index}`]?.rotateX || '0deg',
                  '--rotateY': cardRotations[`lead-${index}`]?.rotateY || '0deg',
                }}
                onMouseMove={(e) => handleCardMouseMove(e, `lead-${index}`)}
                onMouseLeave={() => handleCardMouseLeave(`lead-${index}`)}
              >
                <HStack mb={2} justify={textAlign === 'center' ? 'center' : 'flex-start'}>
                  {item.icon && <Icon as={item.icon} color={accentColor} boxSize={5} />}
                  <Heading as="h4" size="md" color={primaryTextColor}>
                    {item.role}
                  </Heading>
                </HStack>
                <Text fontSize="sm" color={secondaryTextColor} mb={1}>
                  {item.years}
                </Text>
                <Text fontSize="md" color={secondaryTextColor}>
                  {item.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Profile;
