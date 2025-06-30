import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  TagLabel,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaLaptopCode, FaDatabase, FaChartBar, FaPython, FaFlask, FaReact, FaJava, FaRegFileCode } from 'react-icons/fa';
import './Projects.css';

const primaryTextColor = "#E2E8F0";
const secondaryTextColor = "#A0AEC0";
const accentColor = "#63B3ED";

const Projects = () => {
  const projects = [
    {
      title: "Twitter Trend Analysis - Power BI Dashboard",
      description: "Developed an interactive Power BI dashboard to monitor and visualize trending Twitter hashtags and discussions related to elections, public protests, misinformation, and hate speech in India. Implemented a 'Risk Score' metric to simulate real-time Trust & Safety decisions.",
      techStack: [
        { name: "Power BI", icon: FaChartBar },
        { name: "Excel", icon: FaChartBar },
        { name: "Google Trends", icon: null },
        { name: "Twitter", icon: null },
        { name: "Google Translate", icon: null },
      ],
      keyAchievements: [
        "Collected and categorized trending tweets manually, using Google Trends and basic keyword tracking in Telugu.",
        "Used slicers and filters in Power BI for dynamic trend exploration based on topic sensitivity and volume of mentions.",
        "Drafted sample escalation reports based on dashboard insights, aligning risks with YouTube's Community Guidelines."
      ],
    },
    {
      title: "ETL-Driven Customer Behavior Analysis",
      description: "Designed and implemented an ETL pipeline to transform raw sales data into actionable insights on customer behavior, enabling data-driven marketing and stakeholder decision-making.",
      techStack: [
        { name: "Python", icon: FaPython },
        { name: "Pandas", icon: null },
        { name: "SQL", icon: FaDatabase },
        { name: "MySQL", icon: FaDatabase },
        { name: "Google Cloud Storage", icon: null },
        { name: "PowerBI", icon: FaChartBar },
      ],
      keyAchievements: [
        "Extracted and transformed raw sales data using Python and Pandas to calculate key metrics (CLV, AOV, Repeat Purchase Rate).",
        "Loaded transformed data into MySQL for efficient analysis.",
        "Designed interactive PowerBI dashboards to visualize customer behavior and sales trends."
      ],
    },
    {
      title: "Smart Expense Tracker",
      description: "Built a full-stack web application to automate expense tracking from receipt images using OCR, significantly improving data entry efficiency and enhancing text extraction accuracy.",
      techStack: [
        { name: "Python", icon: FaPython },
        { name: "HTML", icon: FaRegFileCode },
        { name: "CSS", icon: FaRegFileCode },
        { name: "JavaScript", icon: FaRegFileCode },
        { name: "SQL", icon: FaDatabase },
        { name: "Flask", icon: FaFlask },
        { name: "React", icon: FaReact },
        { name: "Tesseract OCR", icon: null },
      ],
      keyAchievements: [
        "Improved data entry efficiency by 60% and enhanced text extraction accuracy by 30%.",
        "Developed optimized SQL queries and real-time visualizations to support fast analytics.",
        "Designed a user-friendly UI that improved engagement and streamlined expense categorization."
      ],
    },
    {
      title: "Swinish Corner (E-commerce Platform)",
      description: "Developed a web-based e-commerce platform for pet products, enhancing user convenience and streamlining the shopping experience through an intuitive UI.",
      techStack: [
        { name: "Java", icon: FaJava },
        { name: "JDBC", icon: FaDatabase },
        { name: "JSP", icon: null },
        { name: "HTML", icon: FaRegFileCode },
        { name: "CSS", icon: FaRegFileCode },
        { name: "Tomcat Server", icon: FaLaptopCode },
        { name: "MySQL", icon: FaDatabase },
      ],
      keyAchievements: [
        "Enabled 24/7 access to pet products and improved user convenience.",
        "Designed an intuitive UI with features like product browsing, cart management, and order tracking.",
        "Streamlined the shopping experience and boosted user satisfaction."
      ],
    },
  ];

  const headingAlign = { base: 'center', md: 'left' } as const;

  return (
    <Box
      id="projects"
      className="projects-section-container"
      color={primaryTextColor}
    >
      <VStack className="projects-content-stack" align={headingAlign}>
        <Heading
          as="h2"
          className="projects-main-heading"
          textAlign={headingAlign}
        >
          My Projects
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          width="full"
          maxW="container.lg"
          mx="auto"
        >
          {projects.map((project, index) => (
            <VStack
              key={index}
              className="project-card"
              align="flex-start"
              spacing={4}
            >
              <Heading as="h3" size="lg" color={accentColor} className="project-title">
                {project.title}
              </Heading>
              <Text fontSize="md" color={secondaryTextColor} className="project-description">
                {project.description}
              </Text>
              <HStack wrap="wrap" spacing={2} className="project-tech-stack">
                {project.techStack.map((tech, techIndex) => (
                  <Tag
                    key={techIndex}
                    className="skill-tag"
                    variant="subtle"
                    colorScheme="teal"
                    bg="rgba(0, 128, 128, 0.15)"
                    borderColor="rgba(0, 128, 128, 0.4)"
                    color="teal.300"
                  >
                    {tech.icon && <Icon as={tech.icon} mr={1} />}
                    <TagLabel>{tech.name}</TagLabel>
                  </Tag>
                ))}
              </HStack>
              <Box className="project-achievements-list">
                <Text fontWeight="semibold" mb={2} color={primaryTextColor}>Key Achievements:</Text>
                <VStack align="flex-start" spacing={1} fontSize="sm" color={secondaryTextColor}>
                  {project.keyAchievements.map((achievement, achievementIndex) => (
                    <Text key={achievementIndex}>• {achievement}</Text>
                  ))}
                </VStack>
              </Box>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Projects;
