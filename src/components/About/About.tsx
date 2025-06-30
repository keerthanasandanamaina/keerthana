import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  TagLabel,
  Icon,
  useBreakpointValue,
  type ResponsiveValue,
} from "@chakra-ui/react";
import {
  FaPython,
  FaDatabase,
  FaChartBar,
  FaLightbulb,
  FaUsers,
  FaGraduationCap,
} from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import "./About.css";

const primaryTextColor = "#E2E8F0";
const secondaryTextColor = "#A0AEC0";
const accentColor = "#63B3ED";
const tagBgColor = "rgba(99, 179, 237, 0.15)";
const tagBorderColor = "rgba(99, 179, 237, 0.4)";

const About = () => {
  type TextAlign = "left" | "center" | "right" | "justify" | undefined;
  const textAlign: ResponsiveValue<TextAlign> = useBreakpointValue({
    base: "center",
    md: "left",
  });
  const headingAlign: ResponsiveValue<TextAlign> = useBreakpointValue({
    base: "center",
    md: "left",
  });

  const professionalSummary = `
    Dynamic Entry-Level Data Analyst leveraging expertise in ETL pipelines, data visualization, and digital marketing analytics
    to transform complex datasets into actionable insights. Proven ability to identify critical abuse patterns, monitor sensitive
    online trends, and optimize enforcement workflows across global platforms. Highly proficient in Python, Power BI, SQL,
    and Excel, with a strong foundation in HTML, CSS, and JavaScript for data presentation. Passionately committed to enhancing digital
    safety and ensuring rigorous compliance with global standards. A collaborative problem-solver focused on driving clear
    business value through data-driven strategies.
  `;

  const keySkills = [
    { name: "Data Visualization (Power BI, Excel)", icon: FaChartBar },
    { name: "Python, SQL, JavaScript", icon: FaPython },
    { name: "ETL Pipelines", icon: FaDatabase },
    { name: "Digital Marketing Analytics", icon: FaLightbulb },
    { name: "Digital Safety & Compliance", icon: MdOutlineSecurity },
    { name: "Cross-Functional Collaboration", icon: FaUsers },
    { name: "Agile Project Management", icon: null },
  ];

  const education = [
    {
      degree: "Master's in Computer Science",
      university: "Florida Atlantic University",
      year: "May 2025",
      gpa: "3.8 CGPA",
      coursework:
        "Data Science, Data Management & Analysis with Excel, Software Engineering, Cloud Computing, Web Development, Natural Language Processing, Information Retrieval",
    },
    {
      degree: "Bachelor of Science in Honors (Software Engineering)",
      university: "St. Francis College for Women",
      year: "May 2022",
      gpa: "9.3 CGPA",
      coursework:
        "Programming in C, OOP in Java, Advanced Database Management Systems, Software Testing, Web Programming, Operating Systems, Data Communication & Networks",
    },
  ];

  return (
    <Box
      id="about"
      className="about-section-container"
      color={primaryTextColor}
    >
      <VStack className="about-content-stack" align={headingAlign}>
        <Heading
          as="h2"
          className="about-main-heading"
          textAlign={headingAlign}
        >
          About Me
        </Heading>

        <Text
          className="about-summary-text"
          color={secondaryTextColor}
          textAlign={textAlign}
        >
          {professionalSummary.trim()}
        </Text>
        <VStack className="education-section" align={headingAlign}>
          <Heading
            as="h3"
            size="lg"
            className="about-sub-heading"
            textAlign={headingAlign}
          >
            Education
          </Heading>
          {education.map((edu, index) => (
            <Box key={index} className="about-card" textAlign={textAlign}>
              <HStack
                mb={1}
                justify={textAlign === "center" ? "center" : "flex-start"}
              >
                <Icon as={FaGraduationCap} color={accentColor} boxSize={5} />
                <Heading as="h4" size="md" color={primaryTextColor}>
                  {edu.degree}
                </Heading>
              </HStack>
              <Text fontSize="md" color={secondaryTextColor} mb={1}>
                <strong>{edu.university}</strong> ({edu.year})
              </Text>
              <Text fontSize="sm" color={secondaryTextColor}>
                <strong>GPA:</strong> {edu.gpa}
              </Text>
              {edu.coursework && (
                <Text fontSize="sm" color={secondaryTextColor} mt={2}>
                  <strong>Relevant Coursework:</strong> {edu.coursework}
                </Text>
              )}
            </Box>
          ))}
        </VStack>

        <Box
          className="about-expertise-box"
          width="full"
          textAlign={headingAlign}
        >
          <Heading
            as="h3"
            className="about-expertise-heading"
            color={primaryTextColor}
            textAlign={headingAlign}
          >
            My Core Expertise
          </Heading>
          <HStack
            className="about-skills-stack"
            justify={textAlign === "center" ? "center" : "flex-start"}
          >
            {keySkills.map((skill) => (
              <Tag
                key={skill.name}
                className="about-skill-tag"
                variant="subtle"
                colorScheme="blue"
                bg={tagBgColor}
                borderColor={tagBorderColor}
                color={accentColor}
              >
                {skill.icon && <Icon as={skill.icon} mr={2} />}
                <TagLabel>{skill.name}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default About;
