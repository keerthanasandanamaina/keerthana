import React, { useRef, useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Tag,
  TagLabel,
  Icon,
  SimpleGrid,
  useBreakpointValue,
  type ResponsiveValue,
} from '@chakra-ui/react';
import {
  FaCode,
  FaDatabase,
  FaChartLine,
  FaToolbox,
  FaLaptopCode,
  FaLightbulb,
  FaPuzzlePiece,
  FaHandshake,
  FaClipboardList,
  FaShieldAlt,
  FaReact,
  FaFlask,
  FaUsers,
  FaGlobe,
} from 'react-icons/fa';
import './Skills.css';

declare module 'react' {
  interface CSSProperties {
    '--rotateX'?: string;
    '--rotateY'?: string;
  }
}

const primaryTextColor = "#E2E8F0";
const accentColor = "#63B3ED";
const tagBgColor = "rgba(99, 179, 237, 0.15)";
const tagBorderColor = "rgba(99, 179, 237, 0.4)";

const Skills = () => {
  const technicalSkills = {
    "Languages & Databases": [
      { name: "Java", icon: FaCode },
      { name: "Python", icon: FaCode },
      { name: "SQL", icon: FaDatabase },
      { name: "JavaScript", icon: FaCode },
      { name: "HTML/CSS", icon: FaCode },
      { name: "PostgreSQL", icon: FaDatabase },
      { name: "MySQL", icon: FaDatabase },
      { name: "JDBC", icon: FaDatabase },
    ],
    "Data Analysis & Visualization": [
      { name: "Excel", icon: FaChartLine },
      { name: "Power BI", icon: FaChartLine },
      { name: "NumPy", icon: FaCode },
      { name: "Seaborn", icon: FaChartLine },
      { name: "Pandas", icon: FaCode },
      { name: "Matplotlib", icon: FaChartLine },
    ],
    "Frameworks & Tools": [
      { name: "React", icon: FaReact },
      { name: "Git", icon: FaToolbox },
      { name: "GitLab", icon: FaToolbox },
      { name: "Jira", icon: FaToolbox },
      { name: "Flask", icon: FaFlask },
    ],
    "Developer Environment": [
      { name: "VS Code", icon: FaLaptopCode },
      { name: "Eclipse", icon: FaLaptopCode },
      { name: "GitHub", icon: FaToolbox },
      { name: "Docker", icon: FaLaptopCode },
      { name: "Google Cloud Platform", icon: FaLaptopCode },
    ],
  };

  const softAndCoreSkills = [
    { name: "Digital Trend & Risk Monitoring", icon: FaGlobe },
    { name: "Data Visualization & Reporting", icon: FaChartLine },
    { name: "Cross-Functional Collaboration", icon: FaHandshake },
    { name: "Stakeholder Communication", icon: FaHandshake },
    { name: "Agile Project Management", icon: FaClipboardList },
    { name: "Problem Solving & Analytical Thinking", icon: FaPuzzlePiece },
    { name: "Enhancing Digital Safety & Compliance", icon: FaShieldAlt },
    { name: "Effective Communication", icon: FaLightbulb },
    { name: "Leadership & Time Management", icon: FaUsers },
    { name: "Proactiveness & Organization", icon: null },
  ];

  type TextAlign = "left" | "center" | "right" | "justify" | undefined;
  const textAlign: ResponsiveValue<TextAlign> = useBreakpointValue({ base: 'center', md: 'left' });
  const headingAlign: ResponsiveValue<TextAlign> = useBreakpointValue({ base: 'center', md: 'left' });

  type RotationState = {
    [tagName: string]: { rotateX: string; rotateY: string };
  };
  const [rotations, setRotations] = useState<RotationState>({});
  const tagRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>, tagName: string) => {
    const tag = tagRefs.current[tagName];
    if (!tag) return;

    const rect = tag.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateY = ((x - midX) / midX) * 5;
    const rotateX = ((y - midY) / midY) * -5;

    setRotations(prev => ({
      ...prev,
      [tagName]: { rotateX: `${rotateX}deg`, rotateY: `${rotateY}deg` }
    }));
  };

  const handleMouseLeave = (tagName: string) => {
    setRotations(prev => ({
      ...prev,
      [tagName]: { rotateX: '0deg', rotateY: '0deg' }
    }));
  };

  return (
    <Box
      id="skills"
      className="skills-section-container"
      color={primaryTextColor}
    >
      <VStack className="skills-content-stack" align={headingAlign}>
        <Heading
          as="h2"
          className="skills-main-heading"
          textAlign={headingAlign}
        >
          My Skills & Expertise
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          spacing={{ base: 6, md: 8 }}
          width="full"
          maxW="container.lg"
          mx="auto"
        >
          {Object.entries(technicalSkills).map(([category, skills]) => (
            <VStack key={category} align={headingAlign} spacing={3} className="skill-category-card">
              <Heading as="h3" size="md" color={accentColor} textAlign={headingAlign} mb={2}>
                {category}
              </Heading>
              <HStack wrap="wrap" spacing={2} justify={textAlign === 'center' ? 'center' : 'flex-start'}>
                {skills.map((skill) => (
                  <Tag
                    key={skill.name}
                    ref={el => tagRefs.current[skill.name] = el as HTMLElement | null}
                    className="skill-tag"
                    variant="subtle"
                    colorScheme="blue"
                    bg={tagBgColor}
                    borderColor={tagBorderColor}
                    color={accentColor}
                    style={{
                      '--rotateX': rotations[skill.name]?.rotateX || '0deg',
                      '--rotateY': rotations[skill.name]?.rotateY || '0deg',
                    }}
                    onMouseMove={(e) => handleMouseMove(e, skill.name)}
                    onMouseLeave={() => handleMouseLeave(skill.name)}
                  >
                    {skill.icon && <Icon as={skill.icon} mr={1} />}
                    <TagLabel>{skill.name}</TagLabel>
                  </Tag>
                ))}
              </HStack>
            </VStack>
          ))}
        </SimpleGrid>
        <Box width="full" textAlign={headingAlign} pt={{ base: 8, md: 12 }}>
          <Heading as="h3" className="skills-core-heading" textAlign={headingAlign} mb={4}>
            Core Competencies & Soft Skills
          </Heading>
          <HStack
            wrap="wrap"
            spacing={{ base: 2, md: 3 }}
            justify={textAlign === 'center' ? 'center' : 'flex-start'}
          >
            {softAndCoreSkills.map((skill) => (
              <Tag
                key={skill.name}
                ref={el => tagRefs.current[skill.name] = el as HTMLElement | null}
                className="skill-tag"
                variant="subtle"
                colorScheme="purple"
                bg="rgba(128, 90, 213, 0.15)"
                borderColor="rgba(128, 90, 213, 0.4)"
                color="purple.300"
                style={{
                  '--rotateX': rotations[skill.name]?.rotateX || '0deg',
                  '--rotateY': rotations[skill.name]?.rotateY || '0deg',
                }}
                onMouseMove={(e) => handleMouseMove(e, skill.name)}
                onMouseLeave={() => handleMouseLeave(skill.name)}
              >
                {skill.icon && <Icon as={skill.icon} mr={1} />}
                <TagLabel>{skill.name}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Skills;
