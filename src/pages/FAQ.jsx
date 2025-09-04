import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
      {
        "question": "Which disasters are covered under the policy?",
        "answer": "The policy adopts an \"all-hazard approach,\" covering natural disasters (earthquakes, floods, cyclones, landslides), man-made hazards (fires, chemical accidents, violence), pandemics, and other emergencies like transportation accidents."
    },
    {
        "question": "Who is responsible for implementing school safety measures?",
        "answer": "Multiple stakeholders are responsible, including national, state, district, and local education authorities, school management, teachers, students, parents, local bodies, NGOs, and the community."
    },
    {
        "question": "Are private schools included in the policy?",
        "answer": "Yes, the policy applies to all schools—government, aided, and private—regardless of location (urban or rural)."
    },
    {
        "question": "What are the main objectives of the School Safety Policy?",
        "answer": "The primary objectives are to create safe learning environments, mainstream disaster risk reduction in education, build capacity among stakeholders, and ensure educational continuity after disasters."
    },
    {
        "question": "What is a School Disaster Management Plan (SDMP)?",
        "answer": "An SDMP is a comprehensive document prepared by each school outlining procedures for disaster preparedness, response, evacuation, resource inventory, roles and responsibilities, and communication protocols."
    },
    {
        "question": "How should schools assess their disaster risk?",
        "answer": "Schools should conduct hazard and vulnerability assessments, including ‘hazard hunts’ to identify structural and non-structural risks within and around the school premises."
    },
    {
        "question": "What are structural safety measures?",
        "answer": "Structural measures include constructing or retrofitting buildings to withstand local hazards (e.g., earthquake-resistant design, fireproof materials), ensuring proper exits, and maintaining building integrity as per the National Building Code."
    },
    {
        "question": "What are non-structural safety measures?",
        "answer": "Non-structural measures involve securing furniture, removing obstacles from evacuation routes, safe storage of chemicals, maintaining electrical systems, and regular safety audits."
    },
    {
        "question": "How often should schools conduct safety audits?",
        "answer": "Safety audits should be conducted quarterly to assess fire safety, food safety (midday meals), structural integrity, and hygiene conditions."
    },
    {
        "question": "What is the role of the School Management Committee (SMC)?",
        "answer": "The SMC is responsible for planning, implementing, and monitoring school safety measures, conducting hazard assessments, and ensuring community participation."
    },
    {
        "question": "Who is the School Safety Focal Point Teacher?",
        "answer": "This is a designated teacher responsible for anchoring all safety-related actions, training, and awareness activities in the school."
    },
    {
        "question": "What training is required for school staff and students?",
        "answer": "Training includes disaster awareness, evacuation drills, first aid, fire safety, psycho-social support, and specific roles during emergencies. Regular mock drills are essential."
    },
    {
        "question": "How are students involved in school safety?",
        "answer": "Students participate in mock drills, awareness programs, peer education, and the preparation and implementation of school disaster management plans."
    },
    {
        "question": "How is school safety integrated into the curriculum?",
        "answer": "Disaster risk reduction and safety education are to be included in the curriculum through theoretical and practical lessons relevant to local hazards."
    },
    {
        "question": "What is the role of local authorities (PRIs/Urban Local Bodies)?",
        "answer": "They participate in planning, provision, and maintenance of safe infrastructure, and support the school in implementing safety measures."
    },
    {
        "question": "How does the policy ensure the safety of children with special needs?",
        "answer": "The policy mandates inclusive planning, ensuring evacuation routes and response plans cater to children with disabilities or special health needs."
    },
    {
        "question": "What are the requirements for school recognition regarding safety?",
        "answer": "Schools must comply with safety norms in the National Building Code and state regulations to receive and maintain recognition certificates."
    },
    {
        "question": "What is the process for developing a School Disaster Management Plan?",
        "answer": "The process involves hazard assessment, community participation, resource inventory, planning for evacuation and response, regular drills, and periodic review."
    },
    {
        "question": "What equipment should schools have for emergencies?",
        "answer": "Schools should maintain fire extinguishers, first aid kits, stretchers, ropes, emergency alarms, and updated contact lists for emergency services."
    },
    {
        "question": "How should schools prepare for fire emergencies?",
        "answer": "Schools must have fire safety plans, conduct regular fire drills, ensure clear exit routes, maintain fire extinguishers, and train staff and students in fire response."
    },
    {
        "question": "What are the roles of state and district disaster management authorities?",
        "answer": "They provide technical guidance, training, monitor compliance, and ensure school safety is integrated into disaster management plans at all levels."
    },
    {
        "question": "How are parents involved in school safety?",
        "answer": "Parents are included in SMCs, participate in awareness programs, and are informed about school safety plans and emergency procedures."
    },
    {
        "question": "What is the significance of mock drills?",
        "answer": "Mock drills help familiarize students and staff with evacuation procedures and response actions, ensuring preparedness and minimizing panic during real emergencies."
    },
    {
        "question": "How often should mock drills be conducted?",
        "answer": "Mock drills should be conducted at least once every six months, with regular follow-up and assessment of gaps."
    },
    {
        "question": "What is a hazard hunt exercise?",
        "answer": "A hazard hunt is a participatory activity involving students, teachers, and SMC members to identify and document potential risks inside and outside the school."
    },
    {
        "question": "What are the minimum building specifications for schools?",
        "answer": "Schools must adhere to the National Building Code, ensuring features like adequate exits, fireproof materials, and structural stability. The Supreme Court has mandated strict compliance."
    },
    {
        "question": "How are school buses and transportation safety addressed?",
        "answer": "School vehicles must be regularly maintained, drivers trained in safety protocols, and specific bus safety teams established for emergencies."
    },
    {
        "question": "How is food safety ensured in schools?",
        "answer": "Regular audits of midday meal kitchens, hygiene checks, and safe food storage and preparation practices are required."
    },
    {
        "question": "What is the role of NGOs and corporate bodies in school safety?",
        "answer": "NGOs provide training, advocacy, and technical support, while corporate bodies can fund safety initiatives and ensure compliance in schools they support."
    },
    {
        "question": "How is school safety monitored and reviewed?",
        "answer": "Monitoring is done at national, state, district, and school levels through regular audits, reviews of development plans, and compliance checks."
    },
    {
        "question": "What is the Whole School Development Approach?",
        "answer": "It is a comprehensive strategy integrating safety into all aspects of school planning, infrastructure, curriculum, and community engagement."
    },
    {
        "question": "How are emergencies communicated to parents and authorities?",
        "answer": "Schools must have protocols for timely communication via alarms, public address systems, and direct contact with parents and emergency services."
    },
    {
        "question": "How is psycho-social support provided after disasters?",
        "answer": "Trained teachers and counselors offer counseling, trauma management activities, and support for affected students and staff."
    },
    {
        "question": "What are the legal mandates for school safety in India?",
        "answer": "Key mandates include the Right to Education Act, National Disaster Management Act, National Policy on Disaster Management, and Supreme Court directives."
    },
    {
        "question": "How are new schools planned for safety?",
        "answer": "New schools must be sited in safe locations, designed with disaster resilience features, and constructed using non-combustible, child-friendly materials."
    },
    {
        "question": "What is the role of accreditation authorities?",
        "answer": "They ensure that only schools meeting safety standards receive recognition and monitor continued compliance."
    },
    {
        "question": "How are hazardous materials managed in schools?",
        "answer": "Chemicals and hazardous materials must be stored securely, handled according to safety protocols, and regularly audited."
    },
    {
        "question": "How is water and sanitation safety ensured?",
        "answer": "Schools must provide safe drinking water, clean toilets, and maintain hygiene to prevent health hazards."
    },
    {
        "question": "What is the process for updating school safety plans?",
        "answer": "Plans must be reviewed and updated quarterly by the SMC, considering new risks and lessons from drills or incidents."
    },
    {
        "question": "How can schools access resources for safety improvements?",
        "answer": "Schools can leverage government schemes (SSA, RMSA, NREGS), local body funds, and CSR initiatives for safety-related infrastructure and training."
    },
    {
        "question": "What is the role of media in school safety?",
        "answer": "Media raises awareness, disseminates information, and helps build momentum for safety initiatives."
    },
    {
        "question": "How are schools prepared for pandemics?",
        "answer": "Schools develop protocols for hygiene, social distancing, and continuity of education during health emergencies as part of their disaster management plans."
    },
    {
        "question": "What are the responsibilities of teachers in school safety?",
        "answer": "Teachers participate in planning, receive training, conduct drills, supervise students during emergencies, and provide support after incidents."
    },
    {
        "question": "How is safety ensured during school events and excursions?",
        "answer": "Risk assessments are conducted for events and excursions, with special precautions for hazardous locations and emergency protocols in place."
    },
    {
        "question": "What are the reporting requirements for emergencies?",
        "answer": "Schools must report emergencies promptly to local authorities, parents, and relevant departments as per the disaster management plan."
    },
    {
        "question": "How is school safety linked to educational quality?",
        "answer": "A safe environment is recognized as a key indicator of educational quality, supporting uninterrupted learning and child development."
    },
    {
        "question": "What is the National School Safety Programme (NSSP)?",
        "answer": "NSSP is a government initiative to pilot and implement school safety measures, including policy formulation, capacity building, and retrofitting of schools in selected districts."
    },
    {
        "question": "Where can more information on school safety policy be obtained?",
        "answer": "Further details are available from the National Disaster Management Authority (NDMA), state education departments, and official government websites."
    }
];

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb"
  },
  header: {
    backgroundColor: "white",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    borderBottom: "1px solid #e5e7eb"
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px 16px"
  },
  headerTitle: {
    fontSize: "1.875rem",
    fontWeight: "700",
    color: "#111827",
    textAlign: "center"
  },
  mainContent: {
    maxWidth: "1024px",
    margin: "0 auto",
    padding: "32px 16px"
  },
  searchContainer: {
    marginBottom: "32px"
  },
  searchWrapper: {
    position: "relative"
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    width: "20px",
    height: "20px"
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 40px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s"
  },
  searchInputFocus: {
    borderColor: "#ea580c",
    boxShadow: "0 0 0 2px rgba(234, 88, 12, 0.2)"
  },
  searchResults: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#6b7280"
  },
  faqContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  faqItem: {
    backgroundColor: "white",
    border: "1px solid #d1d5db",
    transition: "border-color 0.2s"
  },
  faqItemHover: {
    borderColor: "#9ca3af"
  },
  faqButton: {
    width: "100%",
    textAlign: "left",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  faqButtonHover: {
    backgroundColor: "#f9fafb"
  },
  faqQuestion: {
    fontWeight: "500",
    color: "#111827",
    paddingRight: "16px"
  },
  faqIcon: {
    flexShrink: 0,
    width: "20px",
    height: "20px",
    color: "#6b7280"
  },
  faqAnswer: {
    padding: "12px 16px",
    borderTop: "1px solid #d1d5db",
    backgroundColor: "white"
  },
  faqAnswerText: {
    color: "#374151",
    lineHeight: "1.6"
  },
  emptyState: {
    textAlign: "center",
    padding: "48px 0"
  },
  emptyStateText: {
    color: "#6b7280",
    fontSize: "1.125rem"
  },
  clearButton: {
    marginTop: "16px",
    color: "#ea580c",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    transition: "color 0.2s"
  },
  clearButtonHover: {
    color: "#c2410c"
  }
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqs;
    
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>
            Frequently Asked Questions
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={styles.mainContent}>
        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <Search style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              style={{
                ...styles.searchInput,
                ...(searchFocused ? styles.searchInputFocus : {})
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
          {searchTerm && (
            <p style={styles.searchResults}>
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div style={styles.faqContainer}>
          {filteredFaqs.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyStateText}>No FAQs found matching your search.</p>
              <button 
                onClick={() => setSearchTerm("")}
                style={styles.clearButton}
                onMouseEnter={(e) => e.target.style.color = styles.clearButtonHover.color}
                onMouseLeave={(e) => e.target.style.color = styles.clearButton.color}
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div 
                key={index} 
                style={{
                  ...styles.faqItem,
                  ...(hoveredItem === index ? styles.faqItemHover : {})
                }}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  style={{
                    ...styles.faqButton,
                    ...(hoveredButton === index ? styles.faqButtonHover : {})
                  }}
                  onClick={() => toggle(index)}
                  onMouseEnter={() => setHoveredButton(index)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <span style={styles.faqQuestion}>{faq.question}</span>
                  <div style={styles.faqIcon}>
                    {activeIndex === index ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </div>
                </button>
                
                {activeIndex === index && (
                  <div style={styles.faqAnswer}>
                    <p style={styles.faqAnswerText}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;