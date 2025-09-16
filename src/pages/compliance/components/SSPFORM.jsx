import React, { useEffect, useState,useMemo } from 'react';
import axios from "axios"
import { FileText, Users, Map, Heart, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import 'react-tooltip/dist/react-tooltip.css'
import Assembly from "../../../../src/assets/assembly.jpeg"
import Building from "../../../../src/assets/building.jpeg"
import Fire from "../../../../src/assets/fire.jpeg"
import Evacuation from "../../../../src/assets/evacuation.jpeg"
import FireExt from "../../../../src/assets/fireext.jpeg"
import Maps from "../../../../src/assets/map.jpeg"
import Disable from "../../../../src/assets/disable.jpeg"
import Legend from "../../../../src/assets/legend.jpeg"
import { Tooltip } from 'react-tooltip'
import {
  TablePagination,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Form, Field } from "formik";
import { IoIosInformationCircle } from "react-icons/io";
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import { DevicesOther, Healing, LocalActivity } from '@mui/icons-material';
import content from 'pages/static/News/content';
import ProgressBar from './ProgressBar.jsx';
const SSPFORM = ( formSteps) => {
  const [totalRequiredFields,setTotalRequiredFields] = useState(0)
  const [totalValidFields,setTotalValidFields] = useState(0)
  const [overallDetails, setOverallDetails] = useState({
  validFields: 0,
  totalRequiredFields: 0
});
  const [completedSteps, setCompletedSteps] = useState(new Set());
 const [overallProgress, setOverallProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState({});
  const [steps, setSteps] = useState(new Set());
    const [currentStep, setCurrentStep] = useState(0);
  const [openSection, setOpenSection] = useState(null);
const [sectionIndexes, setSectionIndexes] = useState({});
 const [currentSection, setCurrentSection] = useState(null);
const [currentIndex, setCurrentIndex] = useState(0);
const [errors,setErrors]= useState(true)
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,    // Set page size to 5
  });
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [groupedSlots, setGroupedSlots] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
    const [hoveredTooltip, setHoveredTooltip] = useState(null);
     const viewImages = {
    mapOrientation: [Maps], // Map section shows Maps image
    buildingLayout: [Building], // Building Layout shows Building image
    evacuationRoutes: [Evacuation], // Evacuation Routes shows Evacuation image
    fireExits: [Fire], // Fire Exits shows Fire image
    fireEquipment: [FireExt], // Fire Equipment shows FireExt image
    assemblyPoint: [Assembly], // Assembly Point shows Assembly image
    disabilityRoutes: [Building], // Can reuse Building or add specific image
    emergencyContactInfo: [Fire], // Can use Fire or add specific image
    legend: [Maps], // Legend can use Maps or add specific image
    dateVersion: [Maps], // Date & Version can use Maps or add specific image
    diable:[Disable],
    legend:[Legend]
  };

console.log("view images",viewImages)
 
   const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone) => {
    return /^[\d\s\-\+\(\)]{10,}$/.test(phone);
  };

  // Your complete form data structure
  const [formData, setFormData] = useState({
    RolesAndResponsibility: [{
      principalinfo: {
        principalName: "",
        principalPhone: '',
        principalEmail: ''
      },
      vicePrincipalinfo: {
        vicePrincipalName: "",
        vicePrincipalPhone: '',
        vicePrincipalEmail: ''
      },
      seniorCoordinate: {
        seniorCoordinateName: '',
        seniorCoordinatePhone: '',
        seniorCoordinateEmail: ''
      },
      scienceTeachers: {
        scienceTeacherName: '',
        scienceTeacherPhone: '',
        scienceTeacherEmail: ''
      },
      labAsistant: {
        labAsistantName: '',
        labAsistantPhone: '',
        labAsistantEmail: ''
      },
      HeadGirlAndBoy: {
        headBoyAndgirlName: '',
        headBoyAndgirlPhone: '',
        headBoyAndGirlEmail: ''
      },
      CulturalHeadAndLiteraryCaptain: {
        CulturalHeadAndLiteraryCaptainName: '',
        CulturalHeadAndLiteraryCaptainPhone: '',
        CulturalHeadAndLiteraryCaptainEmail: ''
      },
      SchoolSafetyOfficer:{
        SchoolSafetyOfficerName: '',
        SchoolSafetyOfficerPhone: '',
        SchoolSafetyOfficerEmail: ''
      }
    }],
    SafetyAndEmergencyPlans: [{
      mapOrientation: {
        isPresent: false,
        file: '',
        youAreHereIndicator: false,
        compassArrow: false
      },
      buildingLayout: {
        isPresent: false,
        file: ''
      },
      evacuationRoutes: {
        isPresent: false,
        file: '',
        atLeastTwoRoutes: false
      },
      fireExits: {
        isPresent: false,
        file: ''
      },
      fireEquipment: {
        isPresent: false,
        file: '',
        fireExtinguishers: false,
        fireAlarms: false,
        hoseReels: false,
        sandBuckets: false
      },
      assemblyPoint: {
        isPresent: false,
        file: '',
        description: ''
      },
      disabilityRoutes: {
        isPresent: false,
        file: '',
        ramps: false,
        widerExits: false,
        accessibleSignage: false
      },
      emergencyContactInfo: {
        isPresent: false,
        file: '',
        fireStationNumber: '',
        ambulanceNumber: '',
        schoolSafetyOfficerContact: '',
        disasterHelpline: ''
      },
      legend: {
        isPresent: false,
        file: '',
        symbolsAndMeanings: ''
      },
      dateVersion: {
        isPresent: false,
        file: '',
        updatedOn: null
      }
    }],
    FirstAidReferralDirectory: [{
      name: '',
      designation: '',
      phone: '',
      isFirstAidCertified: false,
      locationInSchool: ''
    }],
    LocalHealthEmergencyReferralDirectory: {
      primaryHealthCentre: [{
        facilityName: '',
        phoneNumber: '',
        distanceFromSchool: '',
        is24x7: false,
        remarks: ''
      }],
      governmentHospital: [{
        facilityName: '',
        phoneNumber: '',
        distanceFromSchool: '',
        is24x7: false,
        remarks: ''
      }],
      privateHospital: [{
        facilityName: '',
        phoneNumber: '',
        distanceFromSchool: '',
        is24x7: false,
        remarks: ''
      }],
      fireDepartment: [{
        facilityName: '',
        phoneNumber: '',
        distanceFromSchool: '',
        is24x7: false,
        remarks: ''
      }],
      ambulanceService: [{
        facilityName: '',
        phoneNumber: '',
        distanceFromSchool: '',
        is24x7: false,
        remarks: ''
      }],
      ngoHelpline: [{
        facilityName: '',
        phoneNumber: '',
        distanceFromSchool: '',
        is24x7: false,
        remarks: ''
      }]
    },
    ResourceAndEquipmentLog: [{
      item: '',
      location: '',
      typeSpecification: '',
      quantity: 0,
      lastInspectionDate: null,
      nextDueDate: null,
      condition: '',
      remarks: ''
    }],
    FireSafetyEquipmentInventory: [{
      Name: '',
      Location: '',
      TypeAndSpecification: '',
      Quantity: 0,
      LastInspectionDate: null,
      NextDueDate: '',
      Condition: ''
    }],
    FireDrillLog: [{
  dateOfDrill: "",
  timeOfDrillStart: "",
  timeOfDrillEnd: "",
  typeOfDrill: [], // ✅ Always an array (not a string)

  participants: {
    students: {
      boys: 0,
      girls: 0
    },
    staff: {
      teaching: 0,
      nonTeaching: 0,
      admin: 0,
      support: 0
    }
  },

  timeTakenToEvacuate: 0,
  issuesEncountered: '',
  disabledAssistedStudentsEvacuated: '',
  comments: '',

  fireSafetyEquipment: {
    alarm: false,
    fireExtinguisher: false,
    megaphone: false,
    fireHose: false,
    sprinklerSystem: false,
    other: false,
    otherDetails: ''
  },

  observationsFromSafetyOfficer: '',
  correctiveActions: '',
  drillConductedBy: '',

  signatureAndDate: {
    name: '',
    date: null
  }
}],

    RecoveryAndDamagedDestroyedBuilding: [{
      damagedDestroyedBuilding: '',
      recoveryMeasures: '',
      fundingSource: '',
      implementingAgency: '',
      tentativeDurationMonths: 0,
      budget: 0,
      responsibleOfficer: ''
    }],
    RecoveryAndEquipmentFurniture: [{
      damagedDestroyedEquipmentFurniture: '',
      recoveryMeasures: '',
      fundingSource: '',
      implementingAgency: '',
      tentativeDurationMonths: 0,
      budget: 0,
      responsibleOfficer: ''
    }],
    FunctioningOfEducation: [{
      alterateSchoolLocation: '',
      provisionForOnlineEducation: '',
      fundingSourceToMeetExpenditure: '',
      responsibility: ''
    }],
    PlanUpdationCycle: [{
      versionDate: null,
      updateTrigger: '',
      keyChangesMade: '',
      reviewedBy: '',
      nextScheduledUpdate: null
    }],
    FeedBackMechanismCommunityValidation: [{
      FeedbackSource: '',
      DateReceived: null,
      FeedBackSummary: '',
      ActionTaken: '',
      ValidateByCommunity: false
    }],
    PsychologicalRecovery: [{
      noOfStudents: '',
      teacherStaffNeed: '',
      nameOfCounselors: '',
      contactNoOfcounselors: '',
      counselorsAddress: '',
      counselorsResponsibility: ''
    }],
    TeamForStudentsSpecialNeed: [{
      nameOfTeamMember: '',
      memberDesignation: '',
      memberAddress: '',
      memberContactno: '',
      nameOftheStudent: '',
      studentContactNo: '',
      studentAddress: ''
    }],
    DisasterAccidentReporting: [{
      schoolName: '',
      schoolAddress: '',
      contactNumber: '',
      incidentDate: null,
      incidentTime: '',
      disasterType: '',
      totalAffectedPersons: 0,
      deaths: {
        teachingStaff: 0,
        students: 0,
        nonTeachingStaff: 0
      },
      totalInjured: 0,
      lossOfProperty: '',
      responseAgencies: '',
      eventDescription: '',
      responseDescription: '',
      reportedBy: '',
      reportedDate: null,
      status: ''
    }],
    MonthlyQuarterlyReview: [{
      reviewDate: null,
      reviewType: '',
      checklistName: '',
      status: '',
      remarks: '',
      reviewedBy: '',
      nextReviewDate: null
    }]
  });
  console.log(formData)

  //   const steps = [
  //   {
  //     id: 0,
  //     title: 'Roles & Responsibilities',
  //     icon: <Users className="w-4 h-4" />
  //   },
  //   {
  //     id: 1,
  //     title: 'Safety & Emergency Plans',
  //     icon: <AlertCircle className="w-4 h-4" />
  //   },
  //   {
  //     id:2,
  //     title:"First aid And Refferal Directory",
  //     icon:<DevicesOther className='w-4 h-4'/>
  //   },
  //   {
  //     id:3,
  //     title:"Local Health Emergency Referral Directory",
  //     icon:<Healing className='w-4 h-4'/>
  //   },{
  //     id:4,
  //     title:"LocalHealth",
  //     icon:<LocalActivity className='w-4 h-4'/>
  //   }
  // ];




   const stepValidations = {
  0: [
    // Principal info
    'RolesAndResponsibility.0.principalinfo.principalName',
    'RolesAndResponsibility.0.principalinfo.principalPhone',
    'RolesAndResponsibility.0.principalinfo.principalEmail',
    // Vice Principal info
    'RolesAndResponsibility.0.vicePrincipalinfo.vicePrincipalName',
    'RolesAndResponsibility.0.vicePrincipalinfo.vicePrincipalPhone',
    'RolesAndResponsibility.0.vicePrincipalinfo.vicePrincipalEmail',
    // Senior Coordinator
    'RolesAndResponsibility.0.seniorCoordinate.seniorCoordinateName',
    'RolesAndResponsibility.0.seniorCoordinate.seniorCoordinatePhone',
    'RolesAndResponsibility.0.seniorCoordinate.seniorCoordinateEmail',
    // Science Teachers
    'RolesAndResponsibility.0.scienceTeachers.scienceTeacherName',
    'RolesAndResponsibility.0.scienceTeachers.scienceTeacherPhone',
    'RolesAndResponsibility.0.scienceTeachers.scienceTeacherEmail',
    // Lab Assistant
    'RolesAndResponsibility.0.labAsistant.labAsistantName',
    'RolesAndResponsibility.0.labAsistant.labAsistantPhone',
    'RolesAndResponsibility.0.labAsistant.labAsistantEmail',
    // Head Girl/Boy
    'RolesAndResponsibility.0.HeadGirlAndBoy.headBoyAndgirlName',
    'RolesAndResponsibility.0.HeadGirlAndBoy.headBoyAndgirlPhone',
    'RolesAndResponsibility.0.HeadGirlAndBoy.headBoyAndGirlEmail',
    // Cultural Head
    'RolesAndResponsibility.0.CulturalHeadAndLiteraryCaptain.CulturalHeadAndLiteraryCaptainName',
    'RolesAndResponsibility.0.CulturalHeadAndLiteraryCaptain.CulturalHeadAndLiteraryCaptainPhone',
    'RolesAndResponsibility.0.CulturalHeadAndLiteraryCaptain.CulturalHeadAndLiteraryCaptainEmail',
    // School Safety Officer
    'RolesAndResponsibility.0.SchoolSafetyOfficer.SchoolSafetyOfficerName',
    'RolesAndResponsibility.0.SchoolSafetyOfficer.SchoolSafetyOfficerPhone',
    'RolesAndResponsibility.0.SchoolSafetyOfficer.SchoolSafetyOfficerEmail'
  ],
  1: [
    // Safety plans - checking if each section has required presence answer
    'SafetyAndEmergencyPlans.0.mapOrientation.isPresent',
    'SafetyAndEmergencyPlans.0.buildingLayout.isPresent',
    'SafetyAndEmergencyPlans.0.evacuationRoutes.isPresent',
    'SafetyAndEmergencyPlans.0.fireExits.isPresent',
    'SafetyAndEmergencyPlans.0.fireEquipment.isPresent',
    'SafetyAndEmergencyPlans.0.assemblyPoint.isPresent',
    'SafetyAndEmergencyPlans.0.disabilityRoutes.isPresent',
    'SafetyAndEmergencyPlans.0.emergencyContactInfo.isPresent',
    'SafetyAndEmergencyPlans.0.legend.isPresent',
    'SafetyAndEmergencyPlans.0.dateVersion.isPresent',
    // Emergency contact details
    'SafetyAndEmergencyPlans.0.emergencyContactInfo.fireStationNumber',
    'SafetyAndEmergencyPlans.0.emergencyContactInfo.ambulanceNumber',
    'SafetyAndEmergencyPlans.0.emergencyContactInfo.schoolSafetyOfficerContact',
    'SafetyAndEmergencyPlans.0.emergencyContactInfo.disasterHelpline'
  ],
  2: [
    // First Aid Referral Directory
    'FirstAidReferralDirectory.0.name',
    'FirstAidReferralDirectory.0.designation',
    'FirstAidReferralDirectory.0.phone',
    'FirstAidReferralDirectory.0.isFirstAidCertified',
    'FirstAidReferralDirectory.0.locationInSchool'
  ],
  3: [
    // Local Health Emergency Referral Directory - Primary Health Centre
    'LocalHealthEmergencyReferralDirectory.primaryHealthCentre.0.facilityName',
    'LocalHealthEmergencyReferralDirectory.primaryHealthCentre.0.phoneNumber',
    'LocalHealthEmergencyReferralDirectory.primaryHealthCentre.0.distanceFromSchool',
    // Government Hospital
    'LocalHealthEmergencyReferralDirectory.governmentHospital.0.facilityName',
    'LocalHealthEmergencyReferralDirectory.governmentHospital.0.phoneNumber',
    'LocalHealthEmergencyReferralDirectory.governmentHospital.0.distanceFromSchool',
    // Private Hospital
    'LocalHealthEmergencyReferralDirectory.privateHospital.0.facilityName',
    'LocalHealthEmergencyReferralDirectory.privateHospital.0.phoneNumber',
    'LocalHealthEmergencyReferralDirectory.privateHospital.0.distanceFromSchool',
    // Fire Department
    'LocalHealthEmergencyReferralDirectory.fireDepartment.0.facilityName',
    'LocalHealthEmergencyReferralDirectory.fireDepartment.0.phoneNumber',
    'LocalHealthEmergencyReferralDirectory.fireDepartment.0.distanceFromSchool',
    // Ambulance Service
    'LocalHealthEmergencyReferralDirectory.ambulanceService.0.facilityName',
    'LocalHealthEmergencyReferralDirectory.ambulanceService.0.phoneNumber',
    'LocalHealthEmergencyReferralDirectory.ambulanceService.0.distanceFromSchool',
    // NGO Helpline
    'LocalHealthEmergencyReferralDirectory.ngoHelpline.0.facilityName',
    'LocalHealthEmergencyReferralDirectory.ngoHelpline.0.phoneNumber',
    'LocalHealthEmergencyReferralDirectory.ngoHelpline.0.distanceFromSchool'
  ],
  4: [
    // Resource and Equipment Log
    'ResourceAndEquipmentLog.0.item',
    'ResourceAndEquipmentLog.0.location',
    'ResourceAndEquipmentLog.0.typeSpecification',
    'ResourceAndEquipmentLog.0.quantity',
    'ResourceAndEquipmentLog.0.condition'
  ],
  5: [
    // Fire Safety Equipment Inventory
    'FireSafetyEquipmentInventory.0.Name',
    'FireSafetyEquipmentInventory.0.Location',
    'FireSafetyEquipmentInventory.0.TypeAndSpecification',
    'FireSafetyEquipmentInventory.0.Quantity',
    'FireSafetyEquipmentInventory.0.Condition'
  ],
  6: [
    // Fire Drill Log
    'FireDrillLog.0.dateOfDrill',
    'FireDrillLog.0.timeOfDrillStart',
    'FireDrillLog.0.timeOfDrillEnd',
    'FireDrillLog.0.typeOfDrill',
    'FireDrillLog.0.participants.students.boys',
    'FireDrillLog.0.participants.students.girls',
    'FireDrillLog.0.participants.staff.teaching',
    'FireDrillLog.0.participants.staff.nonTeaching',
    'FireDrillLog.0.timeTakenToEvacuate',
    'FireDrillLog.0.drillConductedBy'
  ],
  7: [
    // Recovery - Damaged/Destroyed Building
    'RecoveryAndDamagedDestroyedBuilding.0.damagedDestroyedBuilding',
    'RecoveryAndDamagedDestroyedBuilding.0.recoveryMeasures',
    'RecoveryAndDamagedDestroyedBuilding.0.fundingSource',
    'RecoveryAndDamagedDestroyedBuilding.0.implementingAgency',
    'RecoveryAndDamagedDestroyedBuilding.0.responsibleOfficer'
  ],
  8: [
    // Recovery - Equipment/Furniture
    'RecoveryAndEquipmentFurniture.0.damagedDestroyedEquipmentFurniture',
    'RecoveryAndEquipmentFurniture.0.recoveryMeasures',
    'RecoveryAndEquipmentFurniture.0.fundingSource',
    'RecoveryAndEquipmentFurniture.0.implementingAgency',
    'RecoveryAndEquipmentFurniture.0.responsibleOfficer'
  ],
  9: [
    // Functioning of Education
    'FunctioningOfEducation.0.alterateSchoolLocation',
    'FunctioningOfEducation.0.provisionForOnlineEducation',
    'FunctioningOfEducation.0.fundingSourceToMeetExpenditure',
    'FunctioningOfEducation.0.responsibility'
  ],
  10: [
    // Plan Update Cycle
    'PlanUpdationCycle.0.versionDate',
    'PlanUpdationCycle.0.updateTrigger',
    'PlanUpdationCycle.0.keyChangesMade',
    'PlanUpdationCycle.0.reviewedBy',
    'PlanUpdationCycle.0.nextScheduledUpdate'
  ],
  11: [
    // Feedback Mechanism Community Validation
    'FeedBackMechanismCommunityValidation.0.FeedbackSource',
    'FeedBackMechanismCommunityValidation.0.DateReceived',
    'FeedBackMechanismCommunityValidation.0.FeedBackSummary',
    'FeedBackMechanismCommunityValidation.0.ActionTaken'
  ],
  12: [
    // Psychological Recovery
    'PsychologicalRecovery.0.noOfStudents',
    'PsychologicalRecovery.0.teacherStaffNeed',
    'PsychologicalRecovery.0.nameOfCounselors',
    'PsychologicalRecovery.0.contactNoOfcounselors',
    'PsychologicalRecovery.0.counselorsAddress',
    'PsychologicalRecovery.0.counselorsResponsibility'
  ],
  13: [
    // Team for Students Special Need
    'TeamForStudentsSpecialNeed.0.nameOfTeamMember',
    'TeamForStudentsSpecialNeed.0.memberDesignation',
    'TeamForStudentsSpecialNeed.0.memberAddress',
    'TeamForStudentsSpecialNeed.0.memberContactno',
    'TeamForStudentsSpecialNeed.0.nameOftheStudent',
    'TeamForStudentsSpecialNeed.0.studentContactNo',
    'TeamForStudentsSpecialNeed.0.studentAddress'
  ],
  14: [
    // Disaster Accident Reporting
    'DisasterAccidentReporting.0.schoolName',
    'DisasterAccidentReporting.0.schoolAddress',
    'DisasterAccidentReporting.0.contactNumber',
    'DisasterAccidentReporting.0.incidentDate',
    'DisasterAccidentReporting.0.incidentTime',
    'DisasterAccidentReporting.0.disasterType',
    'DisasterAccidentReporting.0.totalAffectedPersons',
    'DisasterAccidentReporting.0.reportedBy',
    'DisasterAccidentReporting.0.reportedDate',
    'DisasterAccidentReporting.0.status'
  ],
  15: [
    // Monthly Quarterly Review
    'MonthlyQuarterlyReview.0.reviewDate',
    'MonthlyQuarterlyReview.0.reviewType',
    'MonthlyQuarterlyReview.0.checklistName',
    'MonthlyQuarterlyReview.0.status',
    'MonthlyQuarterlyReview.0.reviewedBy',
    'MonthlyQuarterlyReview.0.nextReviewDate'
  ]
};


// const validateFieldValue = (value, fieldType = 'text') => {
//   if (value === undefined || value === null) return false;
  
//   switch (fieldType) {
//     case 'email':
//       return isValidEmail(value);
//     case 'phone':
//       return isValidPhone(value);
//     case 'number':
//       return !isNaN(value) && value > 0;
//     case 'boolean':
//       return typeof value === 'boolean';
//     case 'date':
//       return value instanceof Date || (typeof value === 'string' && value.trim() !== '');
//     case 'array':
//       return Array.isArray(value) && value.length > 0;
//     default:
//       return typeof value === 'string' ? value.trim() !== '' : Boolean(value);
//   }
// };

// const calculateStepCompletion = (stepId) => {
//   const requiredFields = stepValidations[stepId];
//   if (!requiredFields || requiredFields.length === 0) {
//     return { percentage: 100, isComplete: true };
//   }

//   let validFields = 0;
//   const totalRequiredFields = requiredFields.length;

//   requiredFields.forEach(fieldPath => {
//     const value = getNestedValue(formData, fieldPath);
//     let isValid = false;

//     // Determine field type based on field name for better validation
//     if (fieldPath.includes('Email')) {
//       isValid = validateFieldValue(value, 'email');
//     } else if (fieldPath.includes('Phone') || fieldPath.includes('ContactNo')) {
//       isValid = validateFieldValue(value, 'phone');
//     } else if (fieldPath.includes('Date')) {
//       isValid = validateFieldValue(value, 'date');
//     } else if (fieldPath.includes('isPresent') || fieldPath.includes('Certified') || fieldPath.includes('24x7')) {
//       isValid = validateFieldValue(value, 'boolean');
//     } else if (fieldPath.includes('quantity') || fieldPath.includes('Quantity') || fieldPath.includes('budget') || fieldPath.includes('boys') || fieldPath.includes('girls')) {
//       isValid = validateFieldValue(value, 'number');
//     } else if (fieldPath.includes('typeOfDrill')) {
//       isValid = validateFieldValue(value, 'array');
//     } else {
//       isValid = validateFieldValue(value, 'text');
//     }

//     if (isValid) {
//       validFields++;
//     }
//      const percentage = Math.round((validFields / totalRequiredFields) * 100);
//   const isComplete = validFields === totalRequiredFields;

//   return { percentage, isComplete, validFields, totalRequiredFields };

//   });}


// Using your existing getNestedValue function
// const getNestedValue = (obj, path) => {
//   return path.split('.').reduce((current, key) => {
//     return current?.[key];
//   }, obj);
// };

// Helper function to validate field values
const validateFieldValue = (value, fieldType = 'text') => {
  if (value === undefined || value === null) return false;
  
  switch (fieldType) {
    case 'email':
      return isValidEmail(value);
    case 'phone':
      return isValidPhone(value);
    case 'number':
      return !isNaN(value) && value > 0;
    case 'boolean':
      return typeof value === 'boolean';
    case 'date':
      return value instanceof Date || (typeof value === 'string' && value.trim() !== '');
    case 'array':
      return Array.isArray(value) && value.length > 0;
    default:
      return typeof value === 'string' ? value.trim() !== '' : Boolean(value);
  }
};

// Updated calculateStepCompletion function


const calculateStepCompletion = (stepId) => {
  const requiredFields = stepValidations[stepId];
  if (!requiredFields || requiredFields.length === 0) {
    return { percentage: 100, isComplete: true, validFields: 0, totalRequiredFields: 0 };
  }

  let validFields = 0;
  const totalRequiredFields = requiredFields.length;

  requiredFields.forEach(fieldPath => {
    const value = getNestedValue(formData, fieldPath);
    let isValid = false;

    // Determine field type based on field name for better validation
    if (fieldPath.includes('Email')) {
      isValid = validateFieldValue(value, 'email');
    } else if (fieldPath.includes('Phone') || fieldPath.includes('ContactNo')) {
      isValid = validateFieldValue(value, 'phone');
    } else if (fieldPath.includes('Date')) {
      isValid = validateFieldValue(value, 'date');
    } else if (fieldPath.includes('isPresent') || fieldPath.includes('Certified') || fieldPath.includes('24x7')) {
      isValid = validateFieldValue(value, 'boolean');
    } else if (fieldPath.includes('quantity') || fieldPath.includes('Quantity') || fieldPath.includes('budget') || fieldPath.includes('boys') || fieldPath.includes('girls')) {
      isValid = validateFieldValue(value, 'number');
    } else if (fieldPath.includes('typeOfDrill')) {
      isValid = validateFieldValue(value, 'array');
    } else {
      isValid = validateFieldValue(value, 'text');
    }

    if (isValid) {
      validFields++;
    }
  });

  const percentage = Math.round((validFields / totalRequiredFields) * 100);
  const isComplete = validFields === totalRequiredFields;

  return { percentage, isComplete, validFields, totalRequiredFields };
};

const calculateOverallProgress = () => {
  // Guard clause: check if stepValidations exists and has valid structure
  if (!stepValidations || typeof stepValidations !== 'object') {
    return {
      percentage: 0,
      completedSteps: 0,
      totalSteps: 0,
      validFields: 0,
      totalRequiredFields: 0
    };
  }

  const stepIds = Object.keys(stepValidations);
  
  // If no steps exist, return 0
  if (stepIds.length === 0) {
    return {
      percentage: 0,
      completedSteps: 0,
      totalSteps: 0,
      validFields: 0,
      totalRequiredFields: 0
    };
  }

  let totalValidFields = 0;
  let totalRequiredFields = 0;
  let completedSteps = 0;

  stepIds.forEach(stepId => {
    // Ensure stepId is properly converted to number
    const numericStepId = parseInt(stepId, 10);
    
    // Skip invalid step IDs
    if (isNaN(numericStepId)) {
      console.warn(`Invalid step ID: ${stepId}`);
      return;
    }

    const stepCompletion = calculateStepCompletion(numericStepId);
    
    // More robust handling of stepCompletion result
    if (stepCompletion && typeof stepCompletion === 'object') {
      // Ensure we're working with valid numbers
      const validFields = Number(stepCompletion.validFields) || 0;
      const requiredFields = Number(stepCompletion.totalRequiredFields) || 0;
      
      totalValidFields += validFields;
      totalRequiredFields += requiredFields;
      
      // Check if step is complete (handle boolean and percentage-based completion)
      if (stepCompletion.isComplete === true || 
          (stepCompletion.percentage !== undefined && stepCompletion.percentage >= 100)) {
        completedSteps++;
      }
    }
  });

  // Calculate percentage with proper bounds checking
  let overallPercentage = 0;
  if (totalRequiredFields > 0) {
    overallPercentage = Math.round((totalValidFields / totalRequiredFields) * 100);
    // Ensure percentage stays within 0-100 bounds
    overallPercentage = Math.max(0, Math.min(100, overallPercentage));
  }

  return {
    percentage: overallPercentage,
    completedSteps,
    totalSteps: stepIds.length,
    validFields: totalValidFields,
    totalRequiredFields
  };
};


useEffect(() => {
  // Early return if no stepValidations
  if (!stepValidations || typeof stepValidations !== 'object') {
    setStepProgress({});
    setCompletedSteps(new Set());
    setOverallProgress(0);
    setOverallDetails({
      validFields: 0,
      totalRequiredFields: 0
    });
    return;
  }

  const newStepProgress = {};
  const newCompletedSteps = new Set();

  Object.keys(stepValidations).forEach(stepId => {
    // Convert to number and validate
    const numericStepId = parseInt(stepId, 10);
    
    if (isNaN(numericStepId)) {
      console.warn(`Invalid step ID: ${stepId}`);
      return; // Skip this iteration
    }

    try {
      const stepCompletion = calculateStepCompletion(numericStepId);
      
      // Validate stepCompletion result
      if (!stepCompletion || typeof stepCompletion !== 'object') {
        console.warn(`Invalid step completion result for step ${stepId}`);
        newStepProgress[stepId] = 0; // Default to 0% if calculation fails
        return;
      }

      // Ensure percentage is a valid number
      const percentage = Number(stepCompletion.percentage) || 0;
      newStepProgress[stepId] = Math.max(0, Math.min(100, percentage)); // Clamp between 0-100

      // Check completion status
      if (stepCompletion.isComplete === true) {
        newCompletedSteps.add(numericStepId);
      }
    } catch (error) {
      console.error(`Error calculating completion for step ${stepId}:`, error);
      newStepProgress[stepId] = 0; // Default to 0% on error
    }
  });

  // Calculate overall progress
  let overall;
  try {
    overall = calculateOverallProgress();
  } catch (error) {
    console.error('Error calculating overall progress:', error);
    overall = {
      percentage: 0,
      validFields: 0,
      totalRequiredFields: 0
    };
  }

  // Update state - batch these together to avoid multiple re-renders
  setStepProgress(newStepProgress);
  console.log("Set step progress:", newStepProgress);
  
  setCompletedSteps(newCompletedSteps);
  console.log("Set completed steps:", newCompletedSteps);
  
  // Fix: Pass the value, not the setter function
  setOverallProgress(overall.percentage);
  console.log("Set overall progress:", overall.percentage);
  
  setOverallDetails({
    validFields: overall.validFields || 0,
    totalRequiredFields: overall.totalRequiredFields || 0
  });
  console.log("Set overall details:", {
    validFields: overall.validFields || 0,
    totalRequiredFields: overall.totalRequiredFields || 0
  });

}, [formData]); 

// Consider adding other dependencies if needed
// Calculate overall progress across all steps


 let overallPercentage = 0;
  if (totalRequiredFields > 0) {
    overallPercentage = Math.round((totalValidFields / totalRequiredFields) * 100);
    // Ensure percentage stays within 0-100 bounds
    overallPercentage = Math.max(0, Math.min(100, overallPercentage));
  }
  console.log("overall percentage",overallPercentage)
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => {
      return current?.[key];
    }, obj);
  };


  const getStepStatus = (stepId) => {
  const completion = calculateStepCompletion(stepId);
  return {
    percentage: completion.percentage,
    isComplete: completion.isComplete,
    status: completion.isComplete ? 'complete' : 
            completion.percentage > 0 ? 'in-progress' : 'not-started',
    validFields: completion.validFields,
    totalFields: completion.totalRequiredFields
  };
};


const updateProgress = () => {
  const newStepProgress = {};
  const newCompletedSteps = new Set();

  Object.keys(stepValidations).forEach(stepId => {
    const stepCompletion = calculateStepCompletion(parseInt(stepId));
    console.log("step completion",stepCompletion)
    newStepProgress[stepId] = stepCompletion.percentage;
    
    if (stepCompletion.isComplete) {
      newCompletedSteps.add(parseInt(stepId));
    }
  });

  const overall = calculateOverallProgress();

  setStepProgress(newStepProgress);
  setCompletedSteps(newCompletedSteps);
  setOverallProgress(overall.percentage);
};

  const setNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  };





    const validateCurrentStep = () => {
    const requiredFields = stepValidations[currentStep] || [];
    const newErrors = {};
    let isValid = true;

    requiredFields.forEach(fieldPath => {
      const value = getNestedValue(formData, fieldPath);
      
      // Check if field is empty or null
      if (value === null || value === undefined || (typeof value === 'string' && !value.trim())) {
        newErrors[fieldPath] = 'This field is required';
        isValid = false;
      } 
      // Email validation
      else if (fieldPath.includes('Email') && !isValidEmail(value)) {
        newErrors[fieldPath] = 'Please enter a valid email address';
        isValid = false;
      }
      // Phone validation
      else if (fieldPath.includes('Phone') && !isValidPhone(value)) {
        newErrors[fieldPath] = 'Please enter a valid phone number';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

    const isStepComplete = (stepIndex) => {
    const requiredFields = stepValidations[stepIndex] || [];
    return requiredFields.every(fieldPath => {
      const value = getNestedValue(formData, fieldPath);
      return value !== null && value !== undefined && 
             (typeof value !== 'string' || value.trim() !== '');
    });
  };

  const getFieldError = (fieldPath) => {
    return errors[fieldPath];
  };

  const getInputClassName = (fieldPath) => {
    return `h-10 border rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
      getFieldError(fieldPath) ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
    }`;
  };



 const getPeriod = (hour) => {
    if (hour >= 6 && hour < 12) return 'Morning (6:00 AM - 12:00 PM)';
    if (hour >= 12 && hour < 17) return 'Afternoon (12:00 PM - 5:00 PM)';
    return 'Evening (5:00 PM - 8:00 PM)';
  };
  const generateTimeSlots = () => {
    const slots = [];
    
    // Start from 6:00 AM (06:00) to 8:00 PM (20:00)
    for (let hour = 6; hour <= 19; hour++) { // Changed to 19 to avoid slots ending after 8 PM
      for (let minute = 0; minute < 60; minute += 30) { // Changed to 30-minute intervals
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endTime = minutesToTime(timeToMinutes(startTime) + 30); // 30-minute drill duration
        
        // Check if this is lunch break time (12:00 PM - 12:30 PM)
        const isLunchBreak = hour === 12 && minute === 0;
        
        // Check if this slot conflicts with existing bookings (including buffer)
        const hasBookingConflict = hasConflict(startTime, endTime);
        
        // Check if end time goes beyond 8 PM
        const exceedsLimit = timeToMinutes(endTime) > timeToMinutes('20:00');
        
        slots.push({
          time: startTime,
          endTime: endTime,
          available: !isLunchBreak && !hasBookingConflict && !exceedsLimit,
          period: getPeriod(hour),
          reason: isLunchBreak ? 'Lunch Break' : 
                  hasBookingConflict ? 'Conflicts with existing drill' :
                  exceedsLimit ? 'Exceeds operating hours' : null
        });
      }
    }
    
    return slots;
  };

  useEffect(() => {
    setAvailableSlots(generateTimeSlots());
  }, [bookedSlots]);


const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

const tooltipInfo = {
    primaryHealthCentre: "Add details of nearby Primary Health Centres (PHCs) that provide basic medical care and emergency services. Include contact information and distance for quick reference during health emergencies.",
    governmentHospital: "Add information about government hospitals in your area that offer comprehensive medical services. These facilities typically provide emergency care, specialized treatments, and are usually more affordable.",
    privateHospital: "Add details of private hospitals that offer medical services. Include information about their specialties, emergency services availability, and contact details for quick access during medical emergencies.",
    fireDepartment: "Add contact information for local fire stations and emergency response teams. Include their response areas and emergency contact numbers for fire-related incidents and rescue operations.",
    ambulanceService: "Add details of ambulance services available in your area. Include response times, coverage areas, and emergency contact numbers for medical transport and emergency medical services.",
    ngoHelpline: "Add information about NGO helplines that provide crisis support, mental health assistance, counseling services, and other emergency support services available in your region.",
    resourceEquipment: "Add fire safety equipment and resources available at your facility. Track inventory, maintenance schedules, and condition status to ensure emergency preparedness."
  };
 const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };



  const InfoTooltip = ({ category, children }) => (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setHoveredTooltip(category)}
        onMouseLeave={() => setHoveredTooltip(null)}
        className="cursor-help"
      >
        {children}
      </div>
      {hoveredTooltip === category && (
        <div className="absolute z-50 w-80 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg -top-2 -right-4 transform -translate-y-full">
          <div className="absolute bottom-0 right-4 transform translate-y-full">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </div>
          {tooltipInfo[category]}
        </div>
      )}
    </div>
  );

   const calculateEndTime = (startTime) => {
    if (!startTime) return '';
    
    const [hours, minutes] = startTime.split(':').map(Number);
    let endTimeInMinutes = hours * 60 + minutes + 30; // Add 30 minutes
    
    const endHours = Math.floor(endTimeInMinutes / 60);
    const endMinutes = endTimeInMinutes % 60;
    
    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
  };

  // const handleStartTimeSelect = (time) => {
  //   setSelectedStartTime(time);
  //   setSelectedEndTime(calculateEndTime(time));
  // };




  //  const handleBooking = () => {
  //   if (selectedStartTime && selectedEndTime && selectedDate) {
  //     setBookedSlots([...bookedSlots, selectedStartTime]);
  //     alert(`Fire drill scheduled successfully!\nDate: ${selectedDate}\nStart: ${selectedStartTime}\nEnd: ${selectedEndTime}`);
      
  //     // Reset form
  //     setSelectedStartTime('');
  //     setSelectedEndTime('');
  //     setSelectedDate('');
  //   }
  // };

// const renderImageViewer = (section) =>
//     currentSection === section &&
//     viewImages[section]?.length > 0 && (
//       <div className="mt-4 border rounded-lg p-4 bg-gray-50">
//         <h3 className="text-md font-semibold mb-2">
//           {section.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} Images
//         </h3>
//         <div className="text-center">
//           <img
//             src={viewImages[section][currentIndex]}
//             alt={`${section} image`}
//             className="max-w-full max-h-[40vh] object-contain mx-auto rounded-lg shadow-md"
//           />

//           {/* Navigation */}
//           {viewImages[section].length > 1 && (
//             <div className="flex justify-between mt-3">
//               <button
//                 onClick={() =>
//                   setCurrentIndex((prev) =>
//                     prev > 0 ? prev - 1 : viewImages[section].length - 1
//                   )
//                 }
//                 className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800"
//               >
//                 Previous
//               </button>
//               <span className="flex items-center text-gray-600">
//                 {currentIndex + 1} of {viewImages[section].length}
//               </span>
//               <button
//                 onClick={() =>
//                   setCurrentIndex((prev) =>
//                     prev < viewImages[section].length - 1 ? prev + 1 : 0
//                   )
//                 }
//                 className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );


const renderImageViewer = (section) => {
  return currentSection === section &&
    viewImages[section]?.length > 0 ? (
 <div className='flex justify-between' style={{display:'flex'}}>
     <div className="mt-4 border rounded-lg p-4 bg-gray-50 flex justify-between">
      <h3 className="text-md font-semibold mb-2">
        {section.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} Images
      </h3>
      <div className="text-center" style={{height:'100px',width:"100px",marginBottom:"100px"}}>
        <img
          src={viewImages[section][currentIndex]}
          alt={`${section} image`}
          className="max-w-full max-h-32 object-contain mx-auto rounded-lg shadow-md"
        />

        {/* Navigation */}
       
          {viewImages[section].length > 1 && (
         <div className='flex justify-between' style={{display:'flex'}}>
           <div className="flex justify-between mt-3" style={{display:'flex'}}>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev > 0 ? prev - 1 : viewImages[section].length - 1
                )
              }
              className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800"
            >
              Previous
            </button>
            <span className="flex items-center text-gray-600">
              {currentIndex + 1} of {viewImages[section].length}
            </span>
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < viewImages[section].length - 1 ? prev + 1 : 0
                )
              }
              className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800"
            >
              Next
            </button>
          </div>
         </div>
        )}
       
      </div>
    </div>
 </div>
  ) : null;
};



  const groupSlotsByPeriod = (slots) => {
    return slots.reduce((groups, slot) => {
      const period = slot.period;
      if (!groups[period]) {
        groups[period] = [];
      }
      groups[period].push(slot);
      return groups;
    }, {});
  };

  
  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots();
      const grouped = groupSlotsByPeriod(slots);
      setGroupedSlots(grouped);
      setAvailableSlots(slots.filter(slot => slot.available));
    }
  }, [selectedDate, bookedSlots]);


    useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots();
      const grouped = groupSlotsByPeriod(slots);
      setGroupedSlots(grouped);
    }
  }, [selectedDate]);


  const handleNavigation = (section, direction) => {
  setSectionIndexes((prev) => {
    const currentIndex = prev[section] || 0;
    const total = viewImages[section]?.length || 0;

    if (total === 0) return prev;

    let newIndex =
      direction === "next"
        ? (currentIndex + 1) % total
        : (currentIndex - 1 + total) % total;

    return { ...prev, [section]: newIndex };
  });
};
 
   const handleStartTimeSelect = (time, endTime) => {
    setSelectedStartTime(time);
    setSelectedEndTime(endTime);
  };
// const handleBooking = () => {
//     if (selectedDate && selectedStartTime && selectedEndTime) {
//       // Add the booking to the booked slots
//       const newBooking = {
//         date: selectedDate,
//         startTime: selectedStartTime,
//         endTime: selectedEndTime
//       };
//       setBookedSlots([...bookedSlots, newBooking]);
      
//       // Update the formData FireDrillLog with the scheduled drill
//       const updatedFormData = {
//         ...formData,
//         FireDrillLog: [{
//           ...formData.FireDrillLog[0],
//           dateOfDrill: selectedDate,
//           timeOfDrillStart: selectedStartTime,
//           timeOfDrillEnd: selectedEndTime
//         }]
//       };
//       setFormData(updatedFormData);
      
//       // Display the stored data for verification
//       console.log('Updated Fire Drill Log:', updatedFormData.FireDrillLog[0]);
//       alert(`Fire drill scheduled and stored in FireDrillLog!\nDate: ${selectedDate}\nStart: ${selectedStartTime}\nEnd: ${selectedEndTime}`);
      
//       // Clear selections after booking
//       setSelectedStartTime('');
//       setSelectedEndTime('');
//     }
//   };

  // const groupedSlots = groupSlotsByPeriod(availableSlots);
  // Mock FilePreview component
  const FilePreview = ({ fileData, onRemove }) => {
    if (!fileData) return null;
    return (
      <div className="mt-2 p-2 bg-gray-50 rounded border" style={{height:"60px"}}>
        <span className="text-sm text-gray-600">{fileData.name || 'File uploaded'}</span>
        <button onClick={onRemove} className="ml-2 text-red-500 text-sm" style={{ backgroundColor: "#008000" }}>Remove</button>
      </div>
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      rowsPerPage: 5,  // Always set to 5, ignore dropdown
      page: 0,
    });
  };


  const addNewRow = () => {
    setFormData(prevData => ({
      ...prevData,
      ResourceAndEquipmentLog: [
        ...prevData.ResourceAndEquipmentLog,
        {
          item: '',
          location: '',
          typeSpecification: '',
          quantity: 0,
          lastInspectionDate: null,
          nextDueDate: null,
          condition: '',
          remarks: ''
        }
      ]
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const removeRow = (index) => {
    setFormData(prevData => ({
      ...prevData,
      ResourceAndEquipmentLog: prevData.ResourceAndEquipmentLog.filter((_, i) => i !== index)
    }));
  };
   const hasConflict = (startTime, endTime) => {
    const slotStart = timeToMinutes(startTime);
    const slotEnd = timeToMinutes(endTime);
    
    return bookedSlots.some(booked => {
      if (booked.date !== selectedDate) return false;
      
      const bookedStart = timeToMinutes(booked.startTime);
      const bookedEnd = timeToMinutes(booked.endTime);
      
      // Add 30-minute buffer before and after each booked slot
      const bufferStart = bookedStart - 30;
      const bufferEnd = bookedEnd + 30;
      
      // Check if the new slot overlaps with the buffered booked slot
      return !(slotEnd <= bufferStart || slotStart >= bufferEnd);
    });
  };

 

  const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;

  setFormData((prevData) => {
    const newData = JSON.parse(JSON.stringify(prevData)); // Deep clone

    // 🔥 Handle FireDrillLog typeOfDrill (multi-select checkbox)
    if (name === "FireDrillLog.0.typeOfDrill") {
  let currentTypes = newData.FireDrillLog[0].typeOfDrill || [];
  if (checked) {
    if (!currentTypes.includes(value)) {
      currentTypes.push(value);
    }
  } else {
    currentTypes = currentTypes.filter((type) => type !== value);
  }
  newData.FireDrillLog[0].typeOfDrill = currentTypes;
  return newData;
}


    // Helper function to get correct value based on input type
    const getValue = () => {
      if (type === "checkbox") return checked;
      if (type === "radio") return value === "yes";
      if (type === "number") return parseInt(value) || 0;
      if (type === "date") return value || null;
      if (type === "file")
        return files
          ? files.length > 1
            ? Array.from(files)
            : files[0]
          : "";
      return value;
    };

    // Handle ResourceAndEquipmentLog array notation
    if (name.includes("ResourceAndEquipmentLog[") && name.includes("].")) {
      const match = name.match(/ResourceAndEquipmentLog\[(\d+)\]\.(.+)/);
      if (match) {
        const index = parseInt(match[1]);
        const field = match[2];

        if (newData.ResourceAndEquipmentLog && newData.ResourceAndEquipmentLog[index]) {
          newData.ResourceAndEquipmentLog[index][field] =
            field === "quantity" ? parseInt(value) || 0 : getValue();
        }
        return newData;
      }
    }

    // Handle file inputs
    if (type === "file") {
      if (name.includes("_file")) {
        const [section] = name.split("_");
        if (newData.SafetyAndEmergencyPlans?.[0]?.[section]) {
          newData.SafetyAndEmergencyPlans[0][section].file = files[0] || "";
        }
      } else if (name === "uploadImage") {
        newData.uploadImage = Array.from(files);
      } else if (name === "uploadVideo") {
        newData.uploadVideo = Array.from(files);
      } else if (name === "uploadLetter") {
        newData.uploadLetter = files[0] || "";
      }
      return newData;
    }

    // Handle basic form fields (direct properties)
    if (!name.includes("_") && !name.includes(".") && !name.includes("[")) {
      if (newData.hasOwnProperty(name)) {
        newData[name] = getValue();
        return newData;
      }

      // Handle RolesAndResponsibility mappings
      const roleFieldMappings = {
        principalName: "principalinfo.principalName",
        principalPhone: "principalinfo.principalPhone",
        principalEmail: "principalinfo.principalEmail",
        vicePrincipalName: "vicePrincipalinfo.vicePrincipalName",
        vicePrincipalPhone: "vicePrincipalinfo.vicePrincipalPhone",
        vicePrincipalEmail: "vicePrincipalinfo.vicePrincipalEmail",
        seniorCoordinateName: "seniorCoordinate.seniorCoordinateName",
        seniorCoordinatePhone: "seniorCoordinate.seniorCoordinatePhone",
        seniorCoordinateEmail: "seniorCoordinate.seniorCoordinateEmail",
        scienceTeacherName: "scienceTeachers.scienceTeacherName",
        scienceTeacherPhone: "scienceTeachers.scienceTeacherPhone",
        scienceTeacherEmail: "scienceTeachers.scienceTeacherEmail",
        labAsistantName: "labAsistant.labAsistantName",
        labAsistantPhone: "labAsistant.labAsistantPhone",
        labAsistantEmail: "labAsistant.labAsistantEmail",
        headBoyAndgirlPhone: "HeadGirlAndBoy.headBoyAndgirlPhone",
        headBoyAndGirlEmail: "HeadGirlAndBoy.headBoyAndGirlEmail",
        CulturalHeadAndLiteraryCaptainPhone:
          "CulturalHeadAndLiteraryCaptain.CulturalHeadAndLiteraryCaptainPhone",
        CulturalHeadAndLiteraryCaptainEmail:
          "CulturalHeadAndLiteraryCaptain.CulturalHeadAndLiteraryCaptainEmail",
            SchoolSafetyOfficerName: "SchoolSafetyOfficer.SchoolSafetyOfficerName",
        SchoolSafetyOfficerPhone: "SchoolSafetyOfficer.SchoolSafetyOfficerPhone",
        schoolSafetyOfficerEmail: "SchoolSafetyOfficer.schoolSafetyOfficerEmail",
      };

      if (roleFieldMappings[name]) {
        const [section, field] = roleFieldMappings[name].split(".");
        if (newData.RolesAndResponsibility?.[0]?.[section]) {
          newData.RolesAndResponsibility[0][section][field] = getValue();
          return newData;
        }
      }

      // Check if it belongs to any array sections
      const arraySections = [
        "FirstAidReferralDirectory",
        "LocalHealthEmergencyReferralDirectory",
        "ResourceAndEquipmentLog",
        "FireSafetyEquipmentInventory",
        "FireDrillLog",
        "RecoveryAndDamagedDestroyedBuilding",
        "RecoveryAndEquipmentFurniture",
        "FunctioningOfEducation",
        "PlanUpdationCycle",
        "FeedBackMechanismCommunityValidation",
        "PsychologicalRecovery",
        "TeamForStudentsSpecialNeed",
        "DisasterAccidentReporting",
        "MonthlyQuarterlyReview",
        "AdditionalFeedback",
      ];

      for (const section of arraySections) {
        if (newData[section]?.[0]?.hasOwnProperty(name)) {
          newData[section][0][name] = getValue();
          return newData;
        }
      }
    }

    // Handle dot notation (nested fields)
    if (name.includes(".")) {
      const parts = name.split(".");

      if (parts.length >= 4 && parts[0] === "RolesAndResponsibility") {
        const [mainSection, index, subSection, field] = parts;
        const arrayIndex = parseInt(index);
        if (newData[mainSection]?.[arrayIndex]?.[subSection]) {
          newData[mainSection][arrayIndex][subSection][field] = getValue();
        }
      } else if (parts.length === 2) {
        const [section, field] = parts;
        if (newData.RolesAndResponsibility?.[0]?.[section]) {
          newData.RolesAndResponsibility[0][section][field] = getValue();
        }
      } else if (parts.length >= 3) {
        const [mainSection, index, field] = parts;
        const arrayIndex = parseInt(index);

        const arraySections = [
          "FirstAidReferralDirectory",
          "LocalHealthEmergencyReferralDirectory",
          "ResourceAndEquipmentLog",
          "FireSafetyEquipmentInventory",
          "FireDrillLog",
          "RecoveryAndDamagedDestroyedBuilding",
          "RecoveryAndEquipmentFurniture",
          "FunctioningOfEducation",
          "PlanUpdationCycle",
          "FeedBackMechanismCommunityValidation",
          "PsychologicalRecovery",
          "TeamForStudentsSpecialNeed",
          "DisasterAccidentReporting",
          "MonthlyQuarterlyReview",
          "AdditionalFeedback",
          "SafetyAndEmergencyPlans",
        ];

        if (arraySections.includes(mainSection) && newData[mainSection]?.[arrayIndex]) {
          if (parts.length === 3) {
            newData[mainSection][arrayIndex][field] = getValue();
          } else if (parts.length === 4) {
            const [, , subSection, subField] = parts;
            if (newData[mainSection][arrayIndex][subSection]) {
              newData[mainSection][arrayIndex][subSection][subField] = getValue();
            }
          } else if (parts.length === 5) {
            const [, , subSection, subSubSection, subField] = parts;
            if (newData[mainSection][arrayIndex][subSection]?.[subSubSection]) {
              newData[mainSection][arrayIndex][subSection][subSubSection][subField] = getValue();
            }
          }
        }
      }
      return newData;
    }

    // Handle underscore notation
    if (name.includes("_")) {
      const parts = name.split("_");

      if (parts.length === 2) {
        const [section, field] = parts;

        if (newData.SafetyAndEmergencyPlans?.[0]?.[section]) {
          newData.SafetyAndEmergencyPlans[0][section][field] = getValue();
          return newData;
        }

        if (section === "fireSafetyEquipment" && newData.FireDrillLog?.[0]?.fireSafetyEquipment) {
          newData.FireDrillLog[0].fireSafetyEquipment[field] = getValue();
          return newData;
        }

        if (section === "signatureAndDate" && newData.FireDrillLog?.[0]?.signatureAndDate) {
          newData.FireDrillLog[0].signatureAndDate[field] = getValue();
          return newData;
        }

        const arraySections = [
          "FirstAidReferralDirectory",
          "LocalHealthEmergencyReferralDirectory",
          "ResourceAndEquipmentLog",
          "FireSafetyEquipmentInventory",
          "RecoveryAndDamagedDestroyedBuilding",
          "RecoveryAndEquipmentFurniture",
          "FunctioningOfEducation",
          "PlanUpdationCycle",
          "FeedBackMechanismCommunityValidation",
          "PsychologicalRecovery",
          "TeamForStudentsSpecialNeed",
          "DisasterAccidentReporting",
          "MonthlyQuarterlyReview",
          "AdditionalFeedback",
        ];

        for (const arraySection of arraySections) {
          if (newData[arraySection]?.[0]?.[section]) {
            newData[arraySection][0][section][field] = getValue();
            return newData;
          }
        }
      } else if (parts.length === 3) {
        const [section, subsection, field] = parts;

        if (section === "participants" && newData.FireDrillLog?.[0]?.participants?.[subsection]) {
          newData.FireDrillLog[0].participants[subsection][field] = getValue();
          return newData;
        }

        if (section === "deaths" && newData.DisasterAccidentReporting?.[0]?.deaths) {
          newData.DisasterAccidentReporting[0].deaths[subsection] = getValue();
          return newData;
        }
      }
    }

    return newData;
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData for file uploads
      const submitData = new FormData();

      // Helper function to append nested objects to FormData
      const appendToFormData = (data, parentKey = '') => {
        Object.keys(data).forEach(key => {
          const value = data[key];
          const formKey = parentKey ? `${parentKey}.${key}` : key;

          if (value === null || value === undefined) {
            submitData.append(formKey, '');
          } else if (Array.isArray(value)) {
            if (value.length > 0 && value[0] instanceof File) {
              // Handle file arrays
              value.forEach((file, index) => {
                submitData.append(`${formKey}[${index}]`, file);
              });
            } else {
              // Handle regular arrays
              submitData.append(formKey, JSON.stringify(value));
            }
          } else if (value instanceof File) {
            submitData.append(formKey, value);
          } else if (typeof value === 'object') {
            // Handle nested objects
            submitData.append(formKey, JSON.stringify(value));
          } else {
            submitData.append(formKey, value.toString());
          }
        });
      };

      // Append all form data
      appendToFormData(formData);

      // Make API call
      const response = await axios.post("http://localhost:5000/registration", formData, {
        "headers": {
          "Content-Type": "application/json"
        }
      })
      console.log("responce data is ", response.data)
      toast.success("Form submitted successfully");




      // setTimeout(() => {
      //   navigate('/')
      // }, 4000)

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
        // toast.success('Form submitted successfully!');

        // Optional: Reset form or redirect
        // setFormData(initialFormData);

      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      // toast.error("Internal server error")


    }
  };
  // console.log(handleSubmit)
  const addNewEntry = (serviceType) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));

      if (!newData.LocalHealthEmergencyReferralDirectory[serviceType]) {
        newData.LocalHealthEmergencyReferralDirectory[serviceType] = [];
      }

      newData.LocalHealthEmergencyReferralDirectory[serviceType].push({
        facilityName: '',
        phoneNumber: '',
        distanceFromSchool: '',
        is24x7: false,
        remarks: ''
      });

      return newData;
    });
  };

  const handleCheckboxChange = (value, checked) => {
  setFormData((prevData) => {
    const updatedLog = [...prevData.FireDrillLog];
    updatedLog[0].typeOfDrill = checked ? value : "";
    return { ...prevData, FireDrillLog: updatedLog };
  });
};

  const handleServiceChange = (e, serviceType, index) => {
    const { name, value, type } = e.target;

    setFormData(prevData => {

      const newData = JSON.parse(JSON.stringify(prevData));


      if (!newData.LocalHealthEmergencyReferralDirectory) {
        newData.LocalHealthEmergencyReferralDirectory = {};
      }

      if (!newData.LocalHealthEmergencyReferralDirectory[serviceType]) {
        newData.LocalHealthEmergencyReferralDirectory[serviceType] = [];
      }

      // Ensure the specific index exists in the array
      if (!newData.LocalHealthEmergencyReferralDirectory[serviceType][index]) {
        newData.LocalHealthEmergencyReferralDirectory[serviceType][index] = {};
      }


      let newValue = value;


      if (type === 'radio' && name.includes('is24x7')) {
        newValue = value === 'yes' ? true : false;
        newData.LocalHealthEmergencyReferralDirectory[serviceType][index]['is24x7'] = newValue;
      } else {
        // Handle regular text inputs
        newData.LocalHealthEmergencyReferralDirectory[serviceType][index][name] = newValue;
      }

      return newData;
    });
  }


const handleBooking = () => {
    if (!selectedStartTime || !selectedEndTime) return;
    
    setIsSubmitting(true);
    
    // Add the new booking to booked slots
    const newBooking = {
      date: selectedDate,
      startTime: selectedStartTime,
      endTime: selectedEndTime
    };
    
    setBookedSlots(prev => [...prev, newBooking]);
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      FireDrillLog: [{
        ...prev.FireDrillLog[0],
        dateOfDrill: selectedDate,
        timeOfDrillStart: selectedStartTime,
        timeOfDrillEnd: selectedEndTime
      }]
    }));
    
    // Clear selections
    setSelectedStartTime('');
    setSelectedEndTime('');
    
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    if (selectedDate) {
      const slots = generateTimeSlots();
      const grouped = groupSlotsByPeriod(slots);
      setGroupedSlots(grouped);
      setAvailableSlots(slots.filter(slot => slot.available));
    }
  }, [selectedDate, bookedSlots]);
  const removeEntry = (serviceType, index) => {
    setFormData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.LocalHealthEmergencyReferralDirectory[serviceType].splice(index, 1);
      return newData;
    });
  };
  const removeFile = (fieldName) => {
    setFormData(prev => {
      const newData = { ...prev };
      // Handle file removal logic
      return newData;
    });
  };

  const inputStyle = {
    padding: '8px 12px',
    border: '1px solid #d1d5db',
    marginTop:"10px",
    borderRadius: '6px',
    fontSize: '14px',
    width: '100%',
    backgroundColor: '#f9fafb'
  };

  const headingStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#ffb673',
    // marginBottom: '20px'
    marginTop:"20px"
  };

  const sectionStyle = {
    marginBottom: '24px'
  };

  const tabs = [
    {
      id: 0,
      // label: 'Roles & Responsibilities',
      // icon: <Users className="w-4 h-4" />,
      content: (
        <div className='container'>
          <section className="mb-8 h-auto w-screen p-40" >
            <h2 className="font-bold text-[#8BAE3F] text-xl mb-6" style={{ fontSize: "16px", color: '#ffb673',fontWeight:"bold" }}>
              Roles and Responsibilities Matrix
            </h2>

            {/* Principal */}
            <div className="mb-6 w-[100%] p-20">
              <p className="font-semibold text-gray-500 mb-3">Principal's Info</p>
              <div className="flex flex-col sm:flex-row gap-6" style={{ gap: "10px" }}>
                <input
                  type="text"
                  name="RolesAndResponsibility.0.principalinfo.principalName"
                  value={formData.RolesAndResponsibility[0]?.principalinfo?.principalName || ''}
                  onChange={handleChange}
                  placeholder="Enter Principal's Name"
                  required
                  //   className={inputStyle}
                  className="h-10 w-[70%] border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                />
                <input
                  type="text"
                  name="RolesAndResponsibility.0.principalinfo.principalPhone"
                  value={formData.RolesAndResponsibility[0]?.principalinfo?.principalPhone || ''}
                  onChange={handleChange}
                  placeholder="Phone (e.g., 9540802061)"
                  required
                  //   className={inputStyle}
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="RolesAndResponsibility.0.principalinfo.principalEmail"
                  value={formData.RolesAndResponsibility[0]?.principalinfo?.principalEmail || ''}
                  onChange={handleChange}
                  placeholder="Email (e.g., principal@email.com)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Vice Principal */}
            <div className="mb-6">
              <p className="font-semibold text-gray-500 mb-3">Vice Principal's Info</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="RolesAndResponsibility.0.vicePrincipalinfo.vicePrincipalName"
                  value={formData.RolesAndResponsibility[0]?.vicePrincipalinfo?.vicePrincipalName || ''}
                  onChange={handleChange}
                  placeholder="Enter Vice Principal's Name"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="RolesAndResponsibility.0.vicePrincipalinfo.vicePrincipalPhone"
                  value={formData.RolesAndResponsibility[0]?.vicePrincipalinfo?.vicePrincipalPhone || ''}
                  onChange={handleChange}
                  placeholder="Phone (e.g., 9876543210)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="RolesAndResponsibility.0.vicePrincipalinfo.vicePrincipalEmail"
                  value={formData.RolesAndResponsibility[0]?.vicePrincipalinfo?.vicePrincipalEmail || ''}
                  onChange={handleChange}
                  placeholder="Email (e.g., vp@email.com)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Senior Coordinator */}
            <div className="mb-6">
              <p className="font-semibold text-gray-500 mb-3">Senior Coordinator</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="RolesAndResponsibility.0.seniorCoordinate.seniorCoordinateName"
                  value={formData.RolesAndResponsibility[0]?.seniorCoordinate?.seniorCoordinateName || ''}
                  onChange={handleChange}

                  placeholder="Enter Senior Coordinator's Name"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="RolesAndResponsibility.0.seniorCoordinate.seniorCoordinatePhone"
                  value={formData.RolesAndResponsibility[0]?.seniorCoordinate?.seniorCoordinatePhone || ''}
                  onChange={handleChange}
                  placeholder="Phone (e.g., 9876543210)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="RolesAndResponsibility.0.seniorCoordinate.seniorCoordinateEmail"
                  value={formData.RolesAndResponsibility[0]?.seniorCoordinate?.seniorCoordinateEmail || ''}
                  onChange={handleChange}
                  placeholder="Email (e.g., senior@email.com)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Science Teachers */}
            <div className="mb-6">
              <p className="font-semibold text-gray-500 mb-3">Science Teachers</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="RolesAndResponsibility.0.scienceTeachers.scienceTeacherName"
                  value={formData.RolesAndResponsibility[0]?.scienceTeachers?.scienceTeacherName || ''}
                  onChange={handleChange}
                  placeholder="Enter Science Teacher's Name"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="RolesAndResponsibility.0.scienceTeachers.scienceTeacherPhone"
                  value={formData.RolesAndResponsibility[0]?.scienceTeachers?.scienceTeacherPhone || ''}
                  onChange={handleChange}
                  placeholder="Phone (e.g., 9876543210)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="RolesAndResponsibility.0.scienceTeachers.scienceTeacherEmail"
                  value={formData.RolesAndResponsibility[0]?.scienceTeachers?.scienceTeacherEmail || ''}
                  onChange={handleChange}
                  placeholder="Email (e.g., teacher@email.com)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Lab Assistant */}
            <div className="mb-6">
              <p className="font-semibold text-gray-500 mb-3">Lab Assistant</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="RolesAndResponsibility.0.labAsistant.labAsistantName"
                  value={formData.RolesAndResponsibility[0]?.labAsistant?.labAsistantName || ''}
                  onChange={handleChange}
                  placeholder="Enter Lab Assistant's Name"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="RolesAndResponsibility.0.labAsistant.labAsistantPhone"
                  value={formData.RolesAndResponsibility[0]?.labAsistant?.labAsistantPhone || ''}
                  onChange={handleChange}
                  placeholder="Phone (e.g., 9876543210)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="RolesAndResponsibility.0.labAsistant.labAsistantEmail"
                  value={formData.RolesAndResponsibility[0]?.labAsistant?.labAsistantEmail || ''}
                  onChange={handleChange}
                  placeholder="Email (e.g., lab@email.com)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Head Girl / Head Boy */}
            <div className="mb-6">
              <p className="font-semibold text-gray-500 mb-3">Head Girl / Head Boy</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="RolesAndResponsibility.0.HeadGirlAndBoy.headBoyAndgirlName"
                  value={formData.RolesAndResponsibility[0]?.HeadGirlAndBoy?.headBoyAndgirlName || ''}
                  onChange={handleChange}
                  placeholder="Enter Head Girl/Boy's Name"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="RolesAndResponsibility.0.HeadGirlAndBoy.headBoyAndgirlPhone"
                  value={formData.RolesAndResponsibility[0]?.HeadGirlAndBoy?.headBoyAndgirlPhone || ''}
                  onChange={handleChange}
                  placeholder="Phone (e.g., 9876543210)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="RolesAndResponsibility.0.HeadGirlAndBoy.headBoyAndGirlEmail"
                  value={formData.RolesAndResponsibility[0]?.HeadGirlAndBoy?.headBoyAndGirlEmail || ''}
                  onChange={handleChange}
                  placeholder="Email (e.g., head@email.com)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Cultural Head / Literary Captain */}
            <div className="mb-6">
              <p className="font-semibold text-gray-500 mb-3">Cultural Head / Literary Captain</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="RolesAndResponsibility.0.CulturalHeadAndLiteraryCaptain.CulturalHeadAndLiteraryCaptainName"
                  value={formData.RolesAndResponsibility[0]?.CulturalHeadAndLiteraryCaptain?.CulturalHeadAndLiteraryCaptainName || ''}
                  onChange={handleChange}
                  placeholder="Enter Cultural/Literary Head's Name"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="RolesAndResponsibility.0.CulturalHeadAndLiteraryCaptain.CulturalHeadAndLiteraryCaptainPhone"
                  value={formData.RolesAndResponsibility[0]?.CulturalHeadAndLiteraryCaptain?.CulturalHeadAndLiteraryCaptainPhone || ''}
                  onChange={handleChange}
                  placeholder="Phone (e.g., 9876543210)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="RolesAndResponsibility.0.CulturalHeadAndLiteraryCaptain.CulturalHeadAndLiteraryCaptainEmail"
                  value={formData.RolesAndResponsibility[0]?.CulturalHeadAndLiteraryCaptain?.CulturalHeadAndLiteraryCaptainEmail || ''}
                  onChange={handleChange}
                  placeholder="Email (e.g., cultural@email.com)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>



            <div className="mb-6">
              <p className="font-semibold text-gray-500 mb-3">School Safety Officer</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  name="RolesAndResponsibility.0.SchoolSafetyOfficer.SchoolSafetyOfficerName"
                  value={formData.RolesAndResponsibility[0]?.SchoolSafetyOfficer?.SchoolSafetyOfficerName || ''}
                  onChange={handleChange}
                  placeholder="School Safety Officer Name"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  name="RolesAndResponsibility.0.SchoolSafetyOfficer.SchoolSafetyOfficerPhone"
                  value={formData.RolesAndResponsibility[0]?.SchoolSafetyOfficer?.SchoolSafetyOfficerPhone || ''}
                  onChange={handleChange}
                  placeholder="Phone (e.g., 9876543210)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="RolesAndResponsibility.0.SchoolSafetyOfficer.SchoolSafetyOfficerEmail"
                  value={formData.RolesAndResponsibility[0]?.SchoolSafetyOfficer?.SchoolSafetyOfficerEmail || ''}
                  onChange={handleChange}
                  placeholder="Email (e.g., safety officer email)"
                  required
                  style={{ width: "30%", height: "40px", borderRadius: "10px" }}
                  className="h-10 w-full border border-gray-300 rounded-md bg-gray-50 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            


            {/* Form Section */}
   
              {/* </div> */}
            {/* </div> */}
            
          
          </section>
        </div>
      )
    },

    {
      id:2,
      label:'Evacuation map Template',
      content:(
        <div className='container'>

            <div>
             <div style={sectionStyle} className="space-y-6">

              {/* 1. Map Orientation */}
                 <div className="rounded-lg p-4 border border-gray-200">
                  <h2 style={{fontSize:"16px"}}>Evacuation Map Orientation</h2>
        <p className="text-sm font-medium mb-4 text-gray-500">1. Map Orientation</p>
        <div className="flex items-center gap-8 flex-wrap pl-4">
          {["yes", "no"].map((v) => (
            <label key={v} className="flex items-center gap-8 cursor-pointer">
              <input
                type="radio"
                name="SafetyAndEmergencyPlans[0].mapOrientation.isPresent"
                value={v}
                checked={
                  formData.SafetyAndEmergencyPlans[0]?.mapOrientation?.isPresent ===
                  (v === "yes")
                }
                onChange={handleChange}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-500 capitalize">{v}</span>
            </label>
          ))}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            name="mapOrientation_file"
            onChange={handleChange}
            className="cursor-pointer border-2 border-gray-300 px-3 py-1 rounded-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          <label className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={
                formData.SafetyAndEmergencyPlans[0]?.mapOrientation?.youAreHereIndicator ||
                false
              }
              name="mapOrientation_youAreHereIndicator"
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-gray-600" style={{ fontSize: "16px" }}>
              "You Are Here" indicator present
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={
                formData.SafetyAndEmergencyPlans[0]?.mapOrientation?.compassArrow || false
              }
              name="mapOrientation_compassArrow"
              onChange={handleChange}
              className="h-6 w-6"
              style={{ marginLeft: "10px" }}
            />
            <span className="text-gray-600" style={{ fontSize: "16px" }}>
              Compass arrow (North) present
            </span>
          </label>
        </div>

       <FilePreview
  fileData={formData.SafetyAndEmergencyPlans[0]?.dateVersion?.file}
  onRemove={() => removeFile("dateVersion_file")}
/>

<div className="flex gap-4 flex-wrap mt-4" style={{height:"40px"}}>
  <button
    onClick={() =>
      setCurrentSection(
        currentSection === "dateVersion" ? null : "dateVersion"
      )
    }
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 20px",
      background: "linear-gradient(90deg, #48bb78, #48bb78)", // gradient green
      color: "white",
      height: "40px",
      fontWeight: "600",
      border: "none",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    }}
    onMouseOver={(e) =>
      (e.currentTarget.style.background =
        "linear-gradient(90deg, #48bb78, #48bb78)")
    }
    onMouseOut={(e) =>
      (e.currentTarget.style.background =
        "linear-gradient(90deg, #48bb78, #48bb78)")
    }
    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    {/* Eye icon (SVG) */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      style={{ width: "20px", height: "20px" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
   <div > {currentSection === "dateVersion" ? "Hide Image" : "View Image"}</div>
  </button>
</div>

<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
  {renderImageViewer("dateVersion")}
</div>




      </div>

              {/* 2. Building Layout */}
                 <div className="rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-medium mb-4 text-gray-500">
          2. Building Layout{" "}
          <span className="text-gray-400 ml-1">
            (Floors, classrooms, labs, staff rooms, corridors, stairs, restrooms)
          </span>
        </p>
        <div className="flex items-center gap-8 flex-wrap pl-4">
          {["yes", "no"].map((v) => (
            <label key={v} className="flex items-center gap-10 cursor-pointer">
              <input
                type="radio"
                name="buildingLayout_isPresent"
                value={v}
                onChange={handleChange}
                checked={
                  formData.SafetyAndEmergencyPlans[0]?.buildingLayout?.isPresent ===
                  (v === "yes")
                }
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-500 capitalize">{v}</span>
            </label>
          ))}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            name="buildingLayout_file"
            onChange={handleChange}
            className="cursor-pointer border-2 border-gray-300 px-3 py-1 rounded-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <FilePreview
          fileData={formData.SafetyAndEmergencyPlans[0]?.buildingLayout?.file}
          onRemove={() => removeFile("buildingLayout_file")}
        />

      <div className="flex gap-4 flex-wrap mt-4">
  <button
    onClick={() =>
      setCurrentSection(
        currentSection === "buildingLayout" ? null : "buildingLayout"
      )
    }
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 20px",
      background: "linear-gradient(90deg, #48bb78, #48bb78)", // gradient green
      color: "white",
      fontWeight: "600",
      fontSize: "14px",
      border: "none",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    }}
  onMouseOver={(e) =>
      (e.currentTarget.style.background =
        "linear-gradient(90deg, #48bb78, #48bb78)")
    }
    onMouseOut={(e) =>
      (e.currentTarget.style.background =
        "linear-gradient(90deg, #48bb78, #48bb78)")
    }
    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    {/* Eye Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      style={{ width: "18px", height: "18px" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
    {currentSection === "buildingLayout" ? "Hide Image" : "View Image"}
  </button>
</div>

<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
  {renderImageViewer("buildingLayout")}
</div>
      </div>

              {/* 3. Evacuation Routes */}
            <div className="rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-medium mb-4 text-gray-500">
          3. Evacuation Routes{" "}
          <span className="text-gray-400 ml-1">
            (Safest & shortest paths; at least two routes per room)
          </span>
        </p>
        <div className="flex items-center gap-8 flex-wrap pl-4">
          {["yes", "no"].map((v) => (
            <label key={v} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="evacuationRoutes_isPresent"
                value={v}
                onChange={handleChange}
                checked={
                  formData.SafetyAndEmergencyPlans[0]?.evacuationRoutes?.isPresent ===
                  (v === "yes")
                }
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-500 capitalize">{v}</span>
            </label>
          ))}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            name="evacuationRoutes_file"
            onChange={handleChange}
            className="cursor-pointer border-2 border-gray-300 px-3 py-1 rounded-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <label className="mt-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="evacuationRoutes_atLeastTwoRoutes"
            onChange={handleChange}
            checked={
              formData.SafetyAndEmergencyPlans[0]?.evacuationRoutes?.atLeastTwoRoutes || false
            }
            className="h-4 w-4"
          />
          <span className="text-gray-600" style={{ fontSize: "16px" }}>
            At least two routes per room
          </span>
        </label>

        <FilePreview
          fileData={formData.SafetyAndEmergencyPlans[0]?.evacuationRoutes?.file}
          onRemove={() => removeFile("evacuationRoutes_file")}
        />

      <div className="flex gap-4 flex-wrap mt-4">
  <button
    onClick={() =>
      setCurrentSection(
        currentSection === "evacuationRoutes" ? null : "evacuationRoutes"
      )
    }
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 20px",
      background: "linear-gradient(90deg, #48bb78, #48bb78)", // green gradient
      color: "white",
      fontWeight: "600",
      fontSize: "14px",
      border: "none",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    }}
  onMouseOver={(e) =>
      (e.currentTarget.style.background =
        "linear-gradient(90deg, #48bb78, #48bb78)")
    }
    onMouseOut={(e) =>
      (e.currentTarget.style.background =
        "linear-gradient(90deg, #48bb78, #48bb78)")
    }
    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    {/* 👁️ Eye Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      style={{ width: "18px", height: "18px" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
    {currentSection === "evacuationRoutes" ? "Hide Image" : "View Image"}
  </button>
</div>

<div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
  {renderImageViewer("evacuationRoutes")}
</div>


              {/* 4. Fire Exits */}
          <div className='h-40 w-full border-1 border-gray-700' style={{height:"200px",width:"screen", border:"1px #545454",marginRight:"40px"}}>
             <div className="rounded-lg p-4 " style={{marginRight:"20px"}}>
        <p className="text-sm font-medium mb-4 text-gray-500">
          4. Fire Exits{" "}
          <span className="text-gray-400 ml-1">(Clearly marked with red icons or arrows)</span>
        </p>
        <div className="flex items-center gap-8 flex-wrap pl-4">
          {["yes", "no"].map((v) => (
            <label key={v} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="fireExits_isPresent"
                value={v}
                onChange={handleChange}
                checked={
                  formData.SafetyAndEmergencyPlans[0]?.fireExits?.isPresent === (v === "yes")
                }
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-500 capitalize">{v}</span>
            </label>
          ))}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            name="fireExits_file"
            onChange={handleChange}
            className="cursor-pointer border-2 border-gray-300 px-3 py-1 rounded-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <FilePreview
          fileData={formData.SafetyAndEmergencyPlans[0]?.fireExits?.file}
          onRemove={() => removeFile("fireExits_file")}
        />

     <div>
  <div className="flex gap-4 flex-wrap mt-4">
    <button
      onClick={() =>
        setCurrentSection(
          currentSection === "fireExits" ? null : "fireExits"
        )
      }
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 20px",
        background: "linear-gradient(90deg, #48bb78, #48bb78)", // green gradient
        color: "white",
        fontWeight: "600",
        fontSize: "14px",
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
      }}
     onMouseOver={(e) =>
      (e.currentTarget.style.background =
        "linear-gradient(90deg, #48bb78, #48bb78)")
    }
    onMouseOut={(e) =>
      (e.currentTarget.style.background =
        "linear-gradient(90deg, #48bb78, #48bb78)")
    }
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* 👁️ Eye Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        style={{ width: "18px", height: "18px" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z"
        />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {currentSection === "fireExits" ? "Hide Image" : "View Image"}
    </button>
  </div>

  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
    {renderImageViewer("fireExits")}
  </div>
</div>

       </div>
          </div>

</div>



              {/* 5. Fire Equipment */}
             <div className="rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-medium mb-4 text-gray-500">
          5. Fire Equipment{" "}
          <span className="text-gray-400 ml-1">(Extinguishers, alarms, hose reels, sand buckets)</span>
        </p>
        <div className="flex items-center gap-8 flex-wrap pl-4">
          {["yes", "no"].map((v) => (
            <label key={v} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="fireEquipment_isPresent"
                value={v}
                onChange={handleChange}
                checked={
                  formData.SafetyAndEmergencyPlans[0]?.fireEquipment?.isPresent === (v === "yes")
                }
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-500 capitalize">{v}</span>
            </label>
          ))}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            name="fireEquipment_file"
            onChange={handleChange}
            className="cursor-pointer border-2 border-gray-300 px-3 py-1 rounded-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2" style={{ fontSize: "16px" }}>
          {[
            ["fireExtinguishers", "Fire extinguishers"],
            ["fireAlarms", "Fire alarms"],
            ["hoseReels", "Hose reels"],
            ["sandBuckets", "Sand buckets"],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.SafetyAndEmergencyPlans[0]?.fireEquipment?.[key] || false}
                name={`fireEquipment_${key}`}
                onChange={handleChange}
                className="h-4 w-4"
                style={{marginLeft:"6px"}}
              />
              <span className="text-sm text-gray-600" style={{marginRight:"12"}}>{label}</span>
            </label>
          ))}
        </div>

        <FilePreview
          fileData={formData.SafetyAndEmergencyPlans[0]?.fireEquipment?.file}
          
          onRemove={() => removeFile("fireEquipment_file")}
        />
<div>
  <style>
    {`
      .view-btn {
        padding: 10px 20px;
        background: linear-gradient(135deg, #f27f22, #f27f22);
        color: white;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
      }
      .view-btn:hover {
        background: linear-gradient(135deg, #f27f22, #f27f22);
        transform: scale(1.05);
        box-shadow: 0px 6px 12px rgba(0,0,0,0.25);
      }
      .view-btn:active {
        transform: scale(0.95);
      }
    `}
  </style>

  <div className="flex gap-4 flex-wrap mt-4" >
    <button
      onClick={() =>
        setCurrentSection(
          currentSection === "fireEquipment" ? null : "fireEquipment"
        )
      }
      className="view-btn"
      style={{backgroundColor:"#f27f22"}}
    >
      View Image
    </button>
  </div>

  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
    {renderImageViewer("fireEquipment")}
  </div>
</div>

       </div>


              {/* 6. Assembly Point */}
                <div className="rounded-lg p-4 border border-gray-200">
        <p className="text-sm font-medium mb-4 text-gray-500">
          6. Assembly Point{" "}
          <span className="text-gray-400 ml-1">(Safe zones for roll call & medical triage)</span>
        </p>
        <div className="flex items-center gap-8 flex-wrap pl-4">
          {["yes", "no"].map((v) => (
            <label key={v} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="assemblyPoint_isPresent"
                value={v}
                checked={
                  formData.SafetyAndEmergencyPlans[0]?.assemblyPoint?.isPresent === (v === "yes")
                }
                onChange={handleChange}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-500 capitalize">{v}</span>
            </label>
          ))}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            name="assemblyPoint_file"
            onChange={handleChange}
            className="cursor-pointer border-2 border-gray-300 px-3 py-1 rounded-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            style={{width:"220px"}}
          />
        </div>

        <div className="mt-3">
          <textarea
    placeholder="Assembly point description"
    name="legend_symbolsAndMeanings"
    value={formData.SafetyAndEmergencyPlans[0]?.assemblyPoint?.description || ""}
      onChange={handleChange}
   className="w-full px-2 py-1 border border-gray-300 rounded"
   style={{height:"80px",width:"100%"}}
  />
          {/* <input
            type="text"
            placeholder="Assembly point description / location"
            value={formData.SafetyAndEmergencyPlans[0]?.assemblyPoint?.description || ""}
            name="assemblyPoint_description"
            onChange={handleChange}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          /> */}
        </div>

        <FilePreview
          fileData={formData.SafetyAndEmergencyPlans[0]?.assemblyPoint?.file}
          onRemove={() => removeFile("assemblyPoint_file")}
        />

       <div>
  <style>
    {`
      .view-btn {
        padding: 10px 20px;
        background: linear-gradient(135deg, #f27f22, #f27f22);
        color: white;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
      }
      .view-btn:hover {
        background: linear-gradient(135deg, #f27f22, #f27f22);
        transform: scale(1.05);
        box-shadow: 0px 6px 12px rgba(0,0,0,0.25);
      }
      .view-btn:active {
        transform: scale(0.95);
      }
    `}
  </style>

  <div className="flex gap-4 flex-wrap mt-4">
    <button
      onClick={() =>
        setCurrentSection(
          currentSection === "assemblyPoint" ? null : "assemblyPoint"
        )
      }
      className="view-btn"
      style={{backgroundColor:"#f27f22"}}
    >
      View Image
    </button>
  </div>

  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
    {renderImageViewer("assemblyPoint")}
  </div>
</div>

      </div>
    </div>

              {/* 7. Disability Routes */}
            <div className="rounded-lg p-4 border border-gray-200">
  <p className="text-sm font-medium mb-4 text-gray-500">
    7. Disability Routes{" "}
    <span className="text-gray-400 ml-1">
      (Wider exits, ramps, accessible paths with signage)
    </span>
  </p>

  {/* Yes/No + file */}
  <div className="flex items-center gap-8 flex-wrap pl-4">
    {["yes", "no"].map((v) => (
      <label key={v} className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="disabilityRoutes_isPresent"
          value={v}
          checked={
            formData.SafetyAndEmergencyPlans[0]?.disabilityRoutes?.isPresent ===
            (v === "yes")
          }
          onChange={handleChange}
          className="text-green-600 focus:ring-green-500"
        />
        <span className="text-gray-500 capitalize">{v}</span>
      </label>
    ))}

    <input
      type="file"
      accept=".jpg,.jpeg,.png,.pdf"
      name="disabilityRoutes_file"
      onChange={handleChange}
      className="cursor-pointer border-2 border-gray-300 px-3 py-1 rounded-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>

  {/* Sub-checks */}
  <div className="mt-3 grid gap-2 sm:grid-cols-3" style={{marginLeft:"6px"}}>
    {[
      ["ramps", "Ramps"],
      ["widerExits", "Wider exits"],
      ["accessibleSignage", "Accessible signage"],
    ].map(([key, label]) => (
      <label key={key} className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={
            formData.SafetyAndEmergencyPlans[0]?.disabilityRoutes?.[key] ||
            false
          }
          name={`disabilityRoutes_${key}`}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <span className="text-sm text-gray-600" style={{marginRight:"7px"}}>{label}</span>
      </label>
    ))}
  </div>

  {/* File preview */}
  <FilePreview
    fileData={formData.SafetyAndEmergencyPlans[0]?.disabilityRoutes?.file}
    onRemove={() => removeFile("disabilityRoutes_file")}
  />

  {/* Image Viewer Button */}
 <div>
  <style>
    {`
      .view-btn {
        padding: 10px 20px;
        background: linear-gradient(135deg, #f27f22, #f27f22);
        color: white;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
      }
      .view-btn:hover {
        background: linear-gradient(135deg, #f27f22, #f27f22);
        transform: scale(1.05);
        box-shadow: 0px 6px 12px rgba(0,0,0,0.25);
      }
      .view-btn:active {
        transform: scale(0.95);
      }
    `}
  </style>

  <div className="flex gap-4 flex-wrap mt-4">
    <button
      onClick={() =>
        setCurrentSection(
          currentSection === "disabilityRoutes" ? null : "disabilityRoutes"
        )
      }
      className="view-btn"
    >
      View Image
    </button>
  </div>

  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
    {renderImageViewer("disabilityRoutes")}
  </div>
</div>

</div>


              {/* 8. Emergency Contact Info */}
              <div className="rounded-lg p-4 border border-gray-200">
                <p className="text-sm font-medium mb-4 text-gray-500">
                  8. Emergency Contact Info{" "}
                  <span className="text-gray-400 ml-1">(Fire station, safety officer, ambulance, disaster helpline)</span>
                </p>
                <div className="flex items-center gap-8 flex-wrap pl-4">
                  {["yes", "no"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="emergencyContactInfo_isPresent"
                        value={v}
                        checked={formData.SafetyAndEmergencyPlans[0]?.emergencyContactInfo?.isPresent === (v === "yes")}
                        onChange={handleChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-500 capitalize">{v}</span>
                    </label>
                  ))}
                  {/* <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    name='emergencyContactInfo_file'
                    onChange={handleChange}
                    className="cursor-pointer border-2 border-gray-300 px-3 py-1 rounded-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  /> */}
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label htmlFor="Number" style={{fontSize:"17px"}}>Fire Station Number</label>
                  <input
                    type="text"
                    placeholder="eg:998898898"
                    name='emergencyContactInfo_fireStationNumber'
                    value={formData.SafetyAndEmergencyPlans[0]?.emergencyContactInfo?.fireStationNumber || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    className="w-full px-2 py-1 border border-gray-300 rounded" 
                    
                  />
                <label htmlFor="Contact" style={{fontSize:"17px"}}>School Safety Officer Contact</label>
<input
  type="text"
  placeholder="eg: 998898898"
  name="SafetyAndEmergencyPlans.0.emergencyContactInfo.schoolSafetyOfficerContact"
  value={
    formData.SafetyAndEmergencyPlans[0]?.emergencyContactInfo?.schoolSafetyOfficerContact ||
    formData.RolesAndResponsibility[0]?.SchoolSafetyOfficer?.SchoolSafetyOfficerPhone || ''
  }
  onChange={handleChange}
  disabled
  style={inputStyle}
  className="w-full px-2 py-1 border border-gray-300 rounded"
/>

                  <label htmlFor="Number" style={{fontSize:"17px"}}>Ambulance Number</label>
                  <input
                    type="text"
                    placeholder="Ambulance Number"
                    name='emergencyContactInfo_ambulanceNumber'
                    value={formData.SafetyAndEmergencyPlans[0]?.emergencyContactInfo?.ambulanceNumber || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                  <label htmlFor="Helpline" style={{fontSize:"17px"}}>Disaster Helpline</label>
                  <input
                    type="text"
                    placeholder="eg:108"
                    name='emergencyContactInfo_disasterHelpline'
                    value={formData.SafetyAndEmergencyPlans[0]?.emergencyContactInfo?.disasterHelpline || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </div>

                <FilePreview fileData={formData.SafetyAndEmergencyPlans[0]?.emergencyContactInfo?.file} onRemove={() => removeFile("emergencyContactInfo_file")} />
              </div>

              {/* 9. Legend */}
           <div className="rounded-lg p-4 border border-gray-200">
  <p className="text-sm font-medium mb-4 text-gray-500">
    9. Legend (Key Symbols){" "}
    <span className="text-gray-400 ml-1">
      (Use universal symbols with explanations – exit, extinguisher, route, assembly point)
    </span>
  </p>

  {/* Radio buttons + File input */}
  <div className="flex items-center gap-8 flex-wrap pl-4">
    {["yes", "no"].map((v) => (
      <label key={v} className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="legend_isPresent"
          value={v}
          checked={
            formData.SafetyAndEmergencyPlans[0]?.legend?.isPresent ===
            (v === "yes")
          }
          onChange={handleChange}
          className="text-green-600 focus:ring-green-500"
        />
        <span className="text-gray-500 capitalize">{v}</span>
      </label>
    ))}

    <input
      type="file"
      accept=".jpg,.jpeg,.png,.pdf"
      name="legend_file"
      onChange={handleChange}
      className="cursor-pointer border-2 border-gray-300 px-3 py-1 rounded-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>

  {/* Textarea */}
  <textarea
    placeholder="List symbols and meanings (e.g., green arrows = exit routes)"
    name="legend_symbolsAndMeanings"
    value={formData.SafetyAndEmergencyPlans[0]?.legend?.symbolsAndMeanings || ""}
    onChange={handleChange}
    style={{ ...inputStyle, minHeight: 90 }}
    className="mt-3 w-full px-2 py-1 border border-gray-300 rounded resize-none"
  />

  {/* File preview */}
  <FilePreview
    fileData={formData.SafetyAndEmergencyPlans[0]?.legend?.file}
    onRemove={() => removeFile("legend_file")}
  />

  {/* View Images button */}
  <div>
  <style>
    {`
      .view-btn {
        padding: 10px 20px;
        background: linear-gradient(135deg, #38a169, #48bb78);
        color: white;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
      }
      .view-btn:hover {
        background: linear-gradient(135deg, #2f855a, #38a169);
        transform: scale(1.05);
        box-shadow: 0px 6px 12px rgba(0,0,0,0.25);
      }
      .view-btn:active {
        transform: scale(0.95);
      }
    `}
  </style>

  <button
    onClick={() =>
      setOpenSection(openSection === "legend" ? null : "legend")
    }
    className="view-btn mt-4"
  >
    View Image
  </button>
</div>

  {/* Inline Image Viewer */}
  {openSection === "legend" && viewImages["legend"]?.length > 0 && (
    <div className="mt-4 border rounded-lg p-4 bg-gray-50">
      <h3 className="text-md font-semibold mb-2">Legend Images</h3>
      <div className="text-center">
        <img
          src={viewImages["legend"][sectionIndexes["legend"] || 0]}
          alt="Legend"
          className="max-w-full max-h-[40vh] object-contain mx-auto rounded-lg shadow-md"
        />

        {/* Navigation */}
        {viewImages["legend"].length > 1 && (
          <div className='flex justify-between'>
            <div className="flex justify-between mt-3 border-2">
            <button
              onClick={() => handleNavigation("legend", "prev")}
              className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800"
            >
              Previous
            </button>
            <span className="flex items-center text-gray-600">
              {(sectionIndexes["legend"] || 0) + 1} of {viewImages["legend"].length}
            </span>
            <button
              onClick={() => handleNavigation("legend", "next")}
              className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800"
            >
              Next
            </button>
          </div>
          </div>
        )}
      </div>
    </div>
  )}
</div>


              {/* 10. Date & Version */}
              <div className="rounded-lg p-4 border border-gray-200">
                <p className="text-sm font-medium mb-4 text-gray-500">
                  10. Date & Version{" "}
                  <span className="text-gray-400 ml-1">(Indicate last update to ensure version control)</span>
                </p>
                <div className="flex items-center gap-8 flex-wrap pl-4">
                  {["yes", "no"].map((v) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="dateVersion_isPresent"
                        value={v}
                        checked={formData.SafetyAndEmergencyPlans[0]?.dateVersion?.isPresent === (v === "yes")}
                        onChange={handleChange}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="text-gray-500 capitalize">{v}</span>
                    </label>
                  ))}
                  {/* <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    name='dateVersion_file'
                    onChange={handleChange}
                    className="cursor-pointer border-2 border-gray-300 px-3 py-1 rounded-sm text-sm hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                  /> */}
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <input
                    type="date"
                    placeholder="Map Last Updated"
                    name='dateVersion_updatedOn'
                    value={formData.SafetyAndEmergencyPlans[0]?.dateVersion?.updatedOn || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </div>

                <FilePreview fileData={formData.SafetyAndEmergencyPlans[0]?.dateVersion?.file} onRemove={() => removeFile("dateVersion_file")} />
              </div>
     </div>
        </div>
      )
    },
    {
      id:3,
      label:'First Aid Directory',
      content:(
        <div className='container'>
          <h2 style={headingStyle} className=''>First Aid and Referral Directory</h2>

            <div style={{ ...sectionStyle, marginBottom: "10px" }}>
              <p className="font-light text-gray-400 mb-3" style={{ fontSize: "20px", color: '#ffb673' }} >
                A. Local Health & Emergency Referral Directory
              </p>

              <div className="flex gap-10">
                {/* Name */}
                <label htmlFor="Name">Name</label>
                <input
                  placeholder="(e.g., Amit Kumar)"
                  style={inputStyle}
                  name="name"
                  value={formData.FirstAidReferralDirectory[0]?.name || ""}
                  onChange={handleChange}
                  required
                />

                {/* Designation */}
                 <label htmlFor="Designation">Designation</label>
                <input
                  placeholder="(e.g., Doctor)"
                  name="designation"
                  value={formData.FirstAidReferralDirectory[0]?.designation || ""}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />

                {/* Phone */}
                  <label htmlFor="Phone">Phone</label>
                <input
                  placeholder="(e.g., 987456321)"
                  required
                  type='text'
                  name="phone"
                  value={formData.FirstAidReferralDirectory[0]?.phone || ""}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              {/* First Aid Certified */}
              <div className="flex items-center gap-6 mb-3 mt-3">
                <span className="text-sm font-medium text-gray-500">
                  Is First Aid Certified?
                </span>
                <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                  <input
                    type="radio"
                    name="isFirstAidCertified"
                    checked={formData.FirstAidReferralDirectory[0]?.isFirstAidCertified === true}
                    onChange={handleChange}
                    required
                    className="text-green-600 focus:ring-green-500"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                  <input
                    type="radio"
                    name="isFirstAidCertified"
                    checked={formData.FirstAidReferralDirectory[0]?.isFirstAidCertified === false}
                    onChange={handleChange}
                    required
                    className="text-green-600 focus:ring-green-500"
                  />
                  No
                </label>
              </div>

              {/* Location */}
              <input
                placeholder="Location in School (e.g., North wing)"
                name="locationInSchool"
                value={formData.FirstAidReferralDirectory[0]?.locationInSchool || ""}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
        </div>
      )
    },
    {
      id:4,
      label:"Local Health & Emergency Referral Directory",
      content:(
        <div>
             <div className='container'>
          <section className="mb-8 h-auto">

            <div className="p-6 max-w-7xl mx-auto font-sans">
              <h2
                // style={headingStyle} 
                className='text-[#ffb673]'
                style={{ fontSize: "16px", color: '#ffb673' }} >B. Local Health & Emergency Referral Directory</h2>


              <div className="space-y-6 flex justify-end">
                {/* Primary Health Centre */}
                <div style={{ ...sectionStyle, marginBottom: "20px" }}>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-gray-500">Primary Health Centre</p>
                    <button
                      type="button"
                      onClick={() => addNewEntry('primaryHealthCentre')}
                      className="bg-[#8bae3f] text-white px-3 py-1 rounded text-sm hover:bg-[#8bae3f]"
                      style={{ backgroundColor: "#f27f22",border: "none" }}
                    >
                      + Add Entry
                    </button>
                    <IoIosInformationCircle className='text-3xl'/>
                  </div>

                  {formData.LocalHealthEmergencyReferralDirectory.primaryHealthCentre?.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Entry {index + 1}</span>
                        {formData.LocalHealthEmergencyReferralDirectory.primaryHealthCentre.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEntry('primaryHealthCentre', index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                            style={{ backgroundColor: "#008000" }}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="flex gap-4 mb-3">
                        <label htmlFor="NameofFacility"> Facility Name</label>
                        <input
                          placeholder="Name of Facility"
                          style={inputStyle}
                          name="facilityName"
                          value={item.facilityName || ""}
                          onChange={(e) => handleServiceChange(e, 'primaryHealthCentre', index)}
                          className="flex-1"
                        />
                         <label htmlFor="PhoneNumber"> Phone Number</label>
                        <input
                          placeholder="Phone Number"
                          type='text'
                          name="phoneNumber"
                          value={item.phoneNumber || ""}
                          onChange={(e) => handleServiceChange(e, 'primaryHealthCentre', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                          <label htmlFor="Distance"> Distance</label>
                        <input
                          placeholder="Distance (e.g., 2.5 km)"
                          name="distanceFromSchool"
                          value={item.distanceFromSchool || ""}
                          onChange={(e) => handleServiceChange(e, 'primaryHealthCentre', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                      </div>

                      <div className="flex items-center gap-6 mb-3">
                        <span className="text-sm font-medium text-gray-500">24/7 Service Available?</span>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-primaryHealthCentre-${index}`}
                            value="yes"
                            checked={item.is24x7 === true}
                            onChange={(e) => handleServiceChange(e, 'primaryHealthCentre', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-primaryHealthCentre-${index}`}
                            value="no"
                            checked={item.is24x7 === false}
                            onChange={(e) => handleServiceChange(e, 'primaryHealthCentre', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          No
                        </label>
                      </div>

                      <input
                        placeholder="Remarks (optional)"
                        name="remarks"
                        value={item.remarks || ""}
                        onChange={(e) => handleServiceChange(e, 'primaryHealthCentre', index)}
                        style={inputStyle}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>


                <div style={{ ...sectionStyle, marginBottom: "20px" }}>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-gray-500">Government Hospital</p>
                    <button
                      type="button"
                      onClick={() => addNewEntry('governmentHospital')}
                      className="bg-[#8bae3f] text-white px-3 py-1 rounded text-sm hover:bg-[#8bae3f]"
                      style={{ backgroundColor: "#f27f22" ,border: "none"  }}
                    >
                      + Add Entry
                    </button>
                    <IoIosInformationCircle className='text-3xl'/>
                  </div>

                  {formData.LocalHealthEmergencyReferralDirectory.governmentHospital?.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Entry {index + 1}</span>
                        {formData.LocalHealthEmergencyReferralDirectory.governmentHospital.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEntry('governmentHospital', index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                            style={{ backgroundColor: "#008000" }}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="flex gap-4 mb-3">
                        <label htmlFor="HospitalName">Hospital Name</label>
                        <input
                          placeholder="Name of Hospital"
                          style={inputStyle}
                          name="facilityName"
                          value={item.facilityName || ""}
                          onChange={(e) => handleServiceChange(e, 'governmentHospital', index)}
                          className="flex-1"
                        />
                          <label htmlFor="PhoneNumber"> Phone Number</label>
                        <input
                          placeholder="Phone Number"
                          name="phoneNumber"
                          value={item.phoneNumber || ""}
                          onChange={(e) => handleServiceChange(e, 'governmentHospital', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                          <label htmlFor="Distance"> Distance</label>
                        <input
                          placeholder="Distance (e.g., 5 km)"
                          name="distanceFromSchool"
                          value={item.distanceFromSchool || ""}
                          onChange={(e) => handleServiceChange(e, 'governmentHospital', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                      </div>

                      <div className="flex items-center gap-6 mb-3">
                        <span className="text-sm font-medium text-gray-500">24/7 Service Available?</span>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-governmentHospital-${index}`}
                            value="yes"
                            checked={item.is24x7 === true}
                            onChange={(e) => handleServiceChange(e, 'governmentHospital', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-governmentHospital-${index}`}
                            value="no"
                            checked={item.is24x7 === false}
                            onChange={(e) => handleServiceChange(e, 'governmentHospital', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          No
                        </label>
                      </div>

                      <input
                        placeholder="Remarks (optional)"
                        name="remarks"
                        value={item.remarks || ""}
                        onChange={(e) => handleServiceChange(e, 'governmentHospital', index)}
                        style={inputStyle}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Private Hospital */}
                <div style={{ ...sectionStyle, marginBottom: "20px" }}>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-gray-500">Private Hospital</p>
                    <button
                      type="button"
                      onClick={() => addNewEntry('privateHospital')}
                      className="bg-[#8bae3f] text-white px-3 py-1 rounded text-sm hover:bg-[#8bae3f]"
                      style={{ backgroundColor: "#f27f22",border: "none"  }}
                    >
                      + Add Entry
                    </button>
                    <IoIosInformationCircle className='text-3xl'/>
                  </div>

                  {formData.LocalHealthEmergencyReferralDirectory.privateHospital?.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Entry {index + 1}</span>
                        {formData.LocalHealthEmergencyReferralDirectory.privateHospital.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEntry('privateHospital', index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                            style={{ backgroundColor: "#008000" }}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="flex gap-4 mb-3">
                        <label htmlFor="HospitalName">Hospital Name</label>
                        <input
                          placeholder="Name of Hospital"
                          style={inputStyle}
                          name="facilityName"
                          value={item.facilityName || ""}
                          onChange={(e) => handleServiceChange(e, 'privateHospital', index)}
                          className="flex-1"
                        />
                          <label htmlFor="PhoneNumber"> Phone Number</label>
                        <input
                          placeholder="Phone Number"
                          name="phoneNumber"
                          value={item.phoneNumber || ""}
                          onChange={(e) => handleServiceChange(e, 'privateHospital', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                          <label htmlFor="Distance"> Distance</label>
                        <input
                          placeholder="Distance (e.g., 3 km)"
                          name="distanceFromSchool"
                          value={item.distanceFromSchool || ""}
                          onChange={(e) => handleServiceChange(e, 'privateHospital', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                      </div>

                      <div className="flex items-center gap-6 mb-3">
                        <span className="text-sm font-medium text-gray-500">24/7 Service Available?</span>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-privateHospital-${index}`}
                            value="yes"
                            checked={item.is24x7 === true}
                            onChange={(e) => handleServiceChange(e, 'privateHospital', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-privateHospital-${index}`}
                            value="no"
                            checked={item.is24x7 === false}
                            onChange={(e) => handleServiceChange(e, 'privateHospital', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          No
                        </label>
                      </div>

                      <input
                        placeholder="Remarks (optional)"
                        name="remarks"
                        value={item.remarks || ""}
                        onChange={(e) => handleServiceChange(e, 'privateHospital', index)}
                        style={inputStyle}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Fire Department */}
                <div style={{ ...sectionStyle, marginBottom: "20px" }}>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-gray-500">Fire Department</p>
                    <button
                      type="button"
                      onClick={() => addNewEntry('fireDepartment')}
                      className="bg-[#8bae3f] text-white px-3 py-1 rounded text-sm hover:bg-[#8bae3f]"
                      style={{ backgroundColor: "#f27f22",border: "none"  }}
                    >
                      + Add Entry
                    </button>
                    <IoIosInformationCircle className='text-3xl'/>
                  </div>

                  {formData.LocalHealthEmergencyReferralDirectory.fireDepartment?.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Entry {index + 1}</span>
                        {formData.LocalHealthEmergencyReferralDirectory.fireDepartment.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEntry('fireDepartment', index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                            style={{ backgroundColor: "#008000" }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                        <label htmlFor="FireStationName">Fire Station Name</label>
                      <div className="flex gap-4 mb-3">
                        <input
                          placeholder="eg: abc Fire Station"
                          style={inputStyle}
                          name="facilityName"
                          value={item.facilityName || ""}
                          onChange={(e) => handleServiceChange(e, 'fireDepartment', index)}
                          className="flex-1"
                        />
                        <label htmlFor="Emergency Number">Emergency Number</label>
                        <input
                          placeholder="eg: 9876543210"
                          name="phoneNumber"
                          value={item.phoneNumber || ""}
                          onChange={(e) => handleServiceChange(e, 'fireDepartment', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                        <label htmlFor="Distance">Distance</label>
                        <input
                          placeholder="Distance (e.g., 1.5 km)"
                          name="distanceFromSchool"
                          value={item.distanceFromSchool || ""}
                          onChange={(e) => handleServiceChange(e, 'fireDepartment', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                      </div>

                      <div className="flex items-center gap-6 mb-3">
                        <span className="text-sm font-medium text-gray-500">24/7 Service Available?</span>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-fireDepartment-${index}`}
                            value="yes"
                            checked={item.is24x7 === true}
                            onChange={(e) => handleServiceChange(e, 'fireDepartment', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-fireDepartment-${index}`}
                            value="no"
                            checked={item.is24x7 === false}
                            onChange={(e) => handleServiceChange(e, 'fireDepartment', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          No
                        </label>
                      </div>

                      <input
                        placeholder="Remarks (optional)"
                        name="remarks"
                        value={item.remarks || ""}
                        onChange={(e) => handleServiceChange(e, 'fireDepartment', index)}
                        style={inputStyle}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>

                {/* Ambulance Service */}
                <div style={{ ...sectionStyle, marginBottom: "20px" }}>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-gray-500">Ambulance Service</p>
                    <button
                      type="button"
                      onClick={() => addNewEntry('ambulanceService')}
                      className="bg-[#8bae3f] text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      style={{ backgroundColor: "#f27f22",border: "none"  }}
                    >
                      + Add Entry
                    </button>
                    <IoIosInformationCircle className='text-3xl'/>
                  </div>

                  {formData.LocalHealthEmergencyReferralDirectory.ambulanceService?.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Entry {index + 1}</span>
                        {formData.LocalHealthEmergencyReferralDirectory.ambulanceService.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEntry('ambulanceService', index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                            style={{ backgroundColor: "#008000" }}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="flex gap-4 mb-3">
                        <label htmlFor="Ambulance Service Name">Ambulance Service Name</label>
                        <input
                          placeholder="eg: ABC Ambulance Service"
                          style={inputStyle}
                          name="facilityName"
                          value={item.facilityName || ""}
                          onChange={(e) => handleServiceChange(e, 'ambulanceService', index)}
                          className="flex-1"
                        />
                        <label htmlFor="Emergency Number">Emergency Number</label>
                        <input
                          placeholder="eg: 9876543210"
                          name="phoneNumber"
                          value={item.phoneNumber || ""}
                          onChange={(e) => handleServiceChange(e, 'ambulanceService', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                        <label htmlFor="Response Time">Response Time</label>
                        <input
                          placeholder="Response Time (e.g., 10 min)"
                          name="distanceFromSchool"
                          value={item.distanceFromSchool || ""}
                          onChange={(e) => handleServiceChange(e, 'ambulanceService', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                      </div>

                      <div className="flex items-center gap-6 mb-3">
                        <span className="text-sm font-medium text-gray-500">24/7 Service Available?</span>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-ambulanceService-${index}`}
                            value="yes"
                            checked={item.is24x7 === true}
                            onChange={(e) => handleServiceChange(e, 'ambulanceService', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-ambulanceService-${index}`}
                            value="no"
                            checked={item.is24x7 === false}
                            onChange={(e) => handleServiceChange(e, 'ambulanceService', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          No
                        </label>
                      </div>

                      <input
                        placeholder="Remarks (optional)"
                        name="remarks"
                        value={item.remarks || ""}
                        onChange={(e) => handleServiceChange(e, 'ambulanceService', index)}
                        style={inputStyle}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>


                <div style={{ ...sectionStyle, marginBottom: "20px" }}>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-gray-500">NGO Helpline</p>
                    <button
                      type="button"
                      onClick={() => addNewEntry('ngoHelpline')}
                      className="bg-[#8bae3f] text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      style={{ backgroundColor: "#f27f22" , border: "none"  }}
                    >
                      + Add Entry
                    </button>
                    <IoIosInformationCircle className='text-3xl'/>
                  </div>

                  {formData.LocalHealthEmergencyReferralDirectory.ngoHelpline?.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600">Entry {index + 1}</span>
                        {formData.LocalHealthEmergencyReferralDirectory.ngoHelpline.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEntry('ngoHelpline', index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                            style={{ backgroundColor: "#008000" }}
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="flex gap-4 mb-3">
                        <label htmlFor="Ngo Name">Ngo Name</label>
                        <input
                          placeholder="eg: ABC NGO Name"
                          style={inputStyle}
                          name="facilityName"
                          value={item.facilityName || ""}
                          onChange={(e) => handleServiceChange(e, 'ngoHelpline', index)}
                          className="flex-1"
                        />
                        <label htmlFor="Helpline Number">Helpline Number</label>
                        <input
                          placeholder="eg: 9876543210"
                          name="phoneNumber"
                          value={item.phoneNumber || ""}
                          onChange={(e) => handleServiceChange(e, 'ngoHelpline', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                        <label htmlFor="Coverage Area">Coverage Area</label>
                        <input
                          placeholder="eg: National/State/City"
                          name="distanceFromSchool"
                          value={item.distanceFromSchool || ""}
                          onChange={(e) => handleServiceChange(e, 'ngoHelpline', index)}
                          style={inputStyle}
                          className="flex-1"
                        />
                      </div>

                      <div className="flex items-center gap-6 mb-3">
                        <span className="text-sm font-medium text-gray-500">24/7 Service Available?</span>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-ngoHelpline-${index}`}
                            value="yes"
                            checked={item.is24x7 === true}
                            onChange={(e) => handleServiceChange(e, 'ngoHelpline', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer text-gray-500">
                          <input
                            type="radio"
                            name={`is24x7-ngoHelpline-${index}`}
                            value="no"
                            checked={item.is24x7 === false}
                            onChange={(e) => handleServiceChange(e, 'ngoHelpline', index)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          No
                        </label>
                      </div>

                      <input
                        placeholder="Services provided (e.g., Mental health, Crisis support)"
                        name="remarks"
                        value={item.remarks || ""}
                        onChange={(e) => handleServiceChange(e, 'ngoHelpline', index)}
                        style={inputStyle}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
       

          </section>
        </div>
        </div>
      )
    },
    {
      id:5,
      label:"Fire Drill Log",
      content:(
       <div className='container'>
          <h2 style={headingStyle}>Fire Drill Log</h2>
       <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{fontSize:"20px", color:"#ffb673"}}>Schedule Fire Drill</h2>
        <p className="text-gray-600">
          Select a date and time slot for your fire drill. Each drill is 30 minutes long with automatic 30-minute gaps between drills.
        </p>
      </div>

      {/* Date Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar className="inline h-4 w-4 mr-1" />
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={getTodayDate()}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {selectedDate && (
        <>
          {/* Time Slot Selection */}
          <div className="mb-6 f">
            <h3 className="text-lg font-semibold text-gray-800 mb-4"style={{fontSize:"16px"}}>
              <Clock className="inline h-5 w-5 mr-2" />
              Available Time Slots for 
              <div style={{color:"#f27f22",display:"flex"}}>

                {selectedDate}
                </div>
                
            </h3>
            
            {Object.entries(groupedSlots).map(([period, slots]) => (
              <div key={period} className="mb-6">
                <h4 className="text-md font-medium text-gray-700 mb-3">{period}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available ? handleStartTimeSelect(slot.time, slot.endTime) : null}
                      disabled={!slot.available}
                      className={`
                        px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                        ${selectedStartTime === slot.time 
                          ? 'bg-blue-600 text-white ring-2 ring-blue-300' 
                          : slot.available 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-300' 
                            : 'bg-red-100 text-red-600 cursor-not-allowed border border-red-200'
                        }
                      `}
                      title={slot.reason || `${slot.time} - ${slot.endTime}`}
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <span className="font-medium">{slot.time}</span>
                        <span className="text-xs opacity-75">to</span>
                        <span className="font-medium">{slot.endTime}</span>
                        {slot.available ? (
                          <CheckCircle className="h-3 w-3 mt-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 mt-1" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Time Summary */}
          {selectedStartTime && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Selected Time Slot</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-700">Date:</span>
                  <p className="text-blue-600">{selectedDate}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Start Time:</span>
                  <p className="text-blue-600">{selectedStartTime}</p>
                </div>
                <div>
                  <span className="font-medium text-blue-700">End Time:</span>
                  <p className="text-blue-600">{selectedEndTime}</p>
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-600">
                Duration: 30 minutes
              </div>
            </div>
          )}

          {/* Current Fire Drill Log Display */}
          {formData.FireDrillLog[0].dateOfDrill && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Scheduled Fire Drill</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-700">Date:</span>
                  <p className="text-green-600">{formData.FireDrillLog[0].dateOfDrill}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">Start Time:</span>
                  <p className="text-green-600">{formData.FireDrillLog[0].timeOfDrillStart}</p>
                </div>
                <div>
                  <span className="font-medium text-green-700">End Time:</span>
                  <p className="text-green-600">{formData.FireDrillLog[0].timeOfDrillEnd}</p>
                </div>
              </div>
            </div>
          )}

          {/* Existing Bookings Display */}
          {bookedSlots.filter(slot => slot.date === selectedDate).length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Existing Bookings for {selectedDate}</h3>
              <div className="space-y-2">
                {bookedSlots.filter(slot => slot.date === selectedDate).map((booking, index) => (
                  <div key={index} className="text-sm text-yellow-700">
                    {booking.startTime} - {booking.endTime}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4" style={{color:"#f27f22"}}>
            <button
              onClick={handleBooking}
              disabled={!selectedStartTime || !selectedEndTime || isSubmitting}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${selectedStartTime && selectedEndTime && !isSubmitting
                  ? 'bg-#f27f22 text-black border-2 border-red-900 rounded-2xl hover:bg-orange-600 shadow-md hover:shadow-lg '
                
                  : 'bg-#f27f22  text-black cursor-not-allowed'
                }
              `}
              style={{color:"#f27f22"}}
            >
              {isSubmitting ? 'Saving...' : 'Book Drill Slot'}
            </button>
            
            <button
              onClick={() => {
                setSelectedStartTime('');
                setSelectedEndTime('');
                setSelectedDate('');
              }}
              className="px-6 py-3 bg-orange-500 text-black rounded-lg hover:bg-orange-600 transition-all duration-200"
            >
              Clear Selection
            </button>
          </div>

              <div>
  <p className="text-gray-500 mb-2">Type of Drill</p>
  <div className="flex flex-col gap-2">
    {["Announced", "Unannounced", "Mock", "Evacuation"].map((drill) => (
      <label key={drill} className="flex items-center gap-2">
        <input
          type="checkbox"
          name="FireDrillLog.0.typeOfDrill"
          value={drill}
          checked={formData.FireDrillLog[0]?.typeOfDrill?.includes(drill)}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <span className="text-gray-700">{drill}</span>
      </label>
    ))}
  </div>
</div>


            <div className="flex gap-4">
              <div className="w-xl">
                <p className="text-gray-500">No. of Students Participated (Boys)</p>
                <input
                  type="number"
                  placeholder="e.g 15"
                  name='participants_students_boys'
                  value={formData.FireDrillLog[0]?.participants.students.boys || 0}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div className="w-2xl">
                <p className="text-gray-500">No. of Students Participated (Girls)</p>
                <input
                  type="number"
                  placeholder="e.g 20"
                  name='participants_students_girls'
                  value={formData.FireDrillLog[0]?.participants.students.girls || 0}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div>
              <p className="text-gray-500">No. of Staff Participated (Teaching)</p>
              <input
                type="number"
                placeholder="e.g 5"
                name='participants_staff_teaching'
                value={formData.FireDrillLog[0]?.participants.staff.teaching || 0}
                onChange={handleChange}
                style={inputStyle}
                required
              />
              <p className="text-gray-500">No. of Staff Participated (Non-Teaching)</p>
              <input
                type="number"
                placeholder="e.g 3"
                name='participants_staff_nonTeaching'
                value={formData.FireDrillLog[0]?.participants.staff.nonTeaching || 0}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="w-2xl">
                <p className="text-gray-500">No. of Staff Participated (Admin)</p>
                <input
                  type="number"
                  placeholder="e.g 2"
                  name='participants_staff_admin'
                  value={formData.FireDrillLog[0]?.participants.staff.admin || 0}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div className="w-xl">
                <p className="text-gray-500">No. of Staff Participated (Support Staff)</p>
                <input
                  type="number"
                  placeholder="e.g 4"
                  name='participants_staff_support'
                  value={formData.FireDrillLog[0]?.participants.staff.support || 0}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div>
              <p className="text-gray-500">Time Taken to Evacuate (in min.)</p>
              <input
                type="number"
                placeholder="e.g 3"
                name='FireDrillLog.0.timeTakenToEvacuate'
                value={formData.FireDrillLog[0]?.timeTakenToEvacuate || 0}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            {/* Issues Encountered */}
            <div>
              <p className="text-gray-500">Issues Encountered</p>
              <select
                style={inputStyle}
                name='FireDrillLog.0.issuesEncountered'
                value={formData.FireDrillLog[0]?.issuesEncountered || ''}
                onChange={handleChange}
                className="w-full px-2 py-1 border border-gray-300 rounded text-gray-500"
                required
              >
                <option value="">Select an issue</option>
                <option value="panic">Panic</option>
                <option value="blocked-exit">Blocked Exit</option>
                <option value="late-alarm">Late Alarm</option>
                <option value="slow-evacuation">Slow Evacuation</option>
                <option value="student-missing">Student Missing</option>
                <option value="none">No Issues</option>
                <option value="other">Other</option>
              </select>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-gray-500">
                  Disabled/Assisted Students Evacuated
                </p>

                <select
                  style={inputStyle}
                  name='FireDrillLog.0.disabledAssistedStudentsEvacuated'
                  value={formData.FireDrillLog[0]?.disabledAssistedStudentsEvacuated || ''}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-gray-500"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="n/a">Not Applicable</option>
                </select>

                <input
                  placeholder="Enter comments (if any)"
                  style={inputStyle}
                  name='FireDrillLog.0.comments'
                  value={formData.FireDrillLog[0]?.comments || ''}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-gray-500">Fire Safety Equipment</p>

                <div className="flex flex-col gap-1 px-2">
                  <label className="flex items-center gap-2 text-gray-500">
                    <input
                      type="checkbox"
                      name='fireSafetyEquipment_alarm'
                      checked={formData.FireDrillLog[0]?.fireSafetyEquipment.alarm || false}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    Alarm
                  </label>

                  <label className="flex items-center gap-2 text-gray-500">
                    <input
                      type="checkbox"
                      name='fireSafetyEquipment_fireExtinguisher'
                      checked={formData.FireDrillLog[0]?.fireSafetyEquipment.fireExtinguisher || false}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    Fire Extinguisher
                  </label>

                  <label className="flex items-center gap-2 text-gray-500">
                    <input
                      type="checkbox"
                      name='fireSafetyEquipment_megaphone'
                      checked={formData.FireDrillLog[0]?.fireSafetyEquipment.megaphone || false}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    Megaphone
                  </label>

                  <label className="flex items-center gap-2 text-gray-500">
                    <input
                      type="checkbox"
                      name='fireSafetyEquipment_fireHose'
                      checked={formData.FireDrillLog[0]?.fireSafetyEquipment.fireHose || false}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    Fire Hose
                  </label>

                  <label className="flex items-center gap-2 text-gray-500">
                    <input
                      type="checkbox"
                      name='fireSafetyEquipment_sprinklerSystem'
                      checked={formData.FireDrillLog[0]?.fireSafetyEquipment.sprinklerSystem || false}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    Sprinkler System
                  </label>

                  <label className="flex items-center gap-2 text-gray-500">
                    <input
                      type="checkbox"
                      name='fireSafetyEquipment_other'
                      checked={formData.FireDrillLog[0]?.fireSafetyEquipment.other || false}
                      onChange={handleChange}
                      className="h-4 w-4 border-gray-300 rounded"
                    />
                    Other
                  </label>
                </div>

                <input
                  placeholder="Enter details or specify 'Other'"
                  style={inputStyle}
                  name='fireSafetyEquipment_otherDetails'
                  value={formData.FireDrillLog[0]?.fireSafetyEquipment.otherDetails || ''}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-gray-500">Observations from Safety Officer</p>
                <textarea
                  placeholder="Enter observations here..."
                  style={{ ...inputStyle, minHeight: "100px" }}
                  name='FireDrillLog.0.observationsFromSafetyOfficer'
                  value={formData.FireDrillLog[0]?.observationsFromSafetyOfficer || ''}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <p className="text-gray-500">
                  Suggestions / Corrective Actions Needed
                </p>
                <textarea
                  placeholder="Enter suggestions or corrective actions..."
                  style={{ ...inputStyle, minHeight: "100px" }}
                  name='FireDrillLog.0.correctiveActions'
                  value={formData.FireDrillLog[0]?.correctiveActions || ''}
                  onChange={handleChange}
                  className="w-full px-2 py-1 border border-gray-300 rounded resize-none"
                ></textarea>
              </div>

              <div className="mt-4">
                <p className="text-gray-500">Drill Conducted By (Name of Coordinators)</p>
                <input
                  placeholder="e.g John Doe, Jane Smith"
                  name='FireDrillLog.0.drillConductedBy'
                  value={formData.FireDrillLog[0]?.drillConductedBy || ''}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <p className="text-gray-500">Signature and Date</p>

              <div className="flex flex-col">
                <label className="text-gray-500 text-sm mb-1">Name & Signature</label>
                <input
                  placeholder="Enter name"
                  name='signatureAndDate_name'
                  value={formData.FireDrillLog[0]?.signatureAndDate.name || ''}
                  onChange={handleChange}
                  style={inputStyle}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-500 text-sm mb-1">Date</label>
                <input
                  type="date"
                  name='signatureAndDate_date'
                  value={formData.FireDrillLog[0]?.signatureAndDate.date || ''}
                  onChange={handleChange}
                  style={inputStyle}
                  className="w-full px-2 py-1 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

          {/* Debug: Show current form data */}
          {/* <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Current Fire Drill Log Data:</h4>
            <pre className="text-xs text-gray-600 overflow-auto max-h-32">
              {JSON.stringify(formData.FireDrillLog[0], null, 2)}
            </pre>
          </div> */}
        </>
      )}

      {/* Break Time Info */}
      {/* <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">Break Time Policy</p>
            <p className="text-sm text-yellow-700">
              Lunch break times (12:00 PM - 12:30 PM) are reserved and unavailable for fire drill scheduling.
            </p>
          </div>
        </div>
      </div> */}
    </div>
       </div> 
      )
    },
    {
      id:6,
      label:"Resources and Equipment Log (Fire Safety log)",
      content:(
        <div className='container'>
     <h2
              // style={headingStyle}
              style={{ fontSize: "16px", color: '#ffb673' }}>
              4. Resource & Equipment Log (Fire Safety Focused)
            </h2>
            <h3 className="text-gray-500 font-semibold mb-3 text-sm" style={{ fontSize: "16px", color: '#808080' }}>
              A. Fire Safety Equipment Inventory
            </h3>

           
            {/* === Section: Fire Safety Equipment Inventory === */}
            <h2 style={headingStyle}>Fire Safety Equipment Inventory</h2>
            <div style={sectionStyle}>
              <div className='flex flex-col'>
                <p className='text-gray-500'>Name</p>
                <input
                  placeholder="eg.Piyush"
                  style={inputStyle}
                  name='Name'
                  value={formData.FireSafetyEquipmentInventory[0]?.Name}
                  onChange={handleChange}
                  required />
                <div className='flex gap-8'>
                  <div className='w-xl'>
                    <p className='text-gray-500'>Location</p>
                    <input
                      placeholder="eg.Floor"
                      name='Location'
                      value={formData.FireSafetyEquipmentInventory[0]?.Location}
                      onChange={handleChange}
                      style={inputStyle} required />
                  </div>

                  <div className='w-xl relative '>
                    <p className='text-gray-500'>Type/Specification</p>
                    <input
                      placeholder="Type/Specification (e.g., Ordinary combustibles)"
                      name='TypeAndSpecification'
                      value={formData.FireSafetyEquipmentInventory[0]?.TypeAndSpecification}
                      onChange={handleChange}
                      style={inputStyle}
                      required />
                  </div>
                </div>
                <div className='flex gap-8'>
                  <div className='w-xl'>
                    <p className='text-gray-500'>Quantity</p>
                    <input
                      placeholder="(e.g., 5L)"
                      name='Quantity'
                      value={formData.FireSafetyEquipmentInventory[0]?.Quantity}
                      onChange={handleChange}
                      style={inputStyle}
                      required />
                  </div>
                  <div className='w-2xl relative '>
                    <p className='text-gray-500'>Last Inspection date</p>

                    <input
                      placeholder=" (DD/MM/YYYY)"
                      name='LastInspectionDate'
                      value={formData.FireSafetyEquipmentInventory[0]?.LastInspectionDate}
                      onChange={handleChange}
                      style={inputStyle}
                      required />

                  </div>
                  <div className='w-96 relative '>
                    <p className='text-gray-500'>Next Due Date</p>
                    <input
                      placeholder=" (DD/MM/YYYY)"
                      name='NextDueDate'
                      value={formData.FireSafetyEquipmentInventory[0]?.NextDueDate}
                      onChange={handleChange}
                      style={inputStyle} required />
                  </div>
                </div>
                <div>
                  <p className='text-gray-500'>Condition (Good/Replace)</p>
                  <input
                    placeholder="e.g (Good/Replace)"
                    name='Condition'
                    value={formData.FireSafetyEquipmentInventory[0]?.Condition}
                    onChange={handleChange}
                    style={inputStyle} required />
                </div>
              </div>
            </div>
        </div>
      )
    },
    {
      id:7,
      label:"Reporting and Documentation: Recovery of Damaged/Destroyed Building",
      content:(
        <div className='container'>
                
            <div>
              <h2 style={headingStyle}>Reporting and Documentation: Recovery of Damaged/Destroyed Building</h2>
              <div style={sectionStyle}>
                <div className='flex gap-4'>
                  <div className='w-3xl'>
                    <p className='text-gray-500'>Damaged/Destroyed Building</p>
                    <input
                      placeholder="e.g, Damaged/Destroyed Building"
                      name='damagedDestroyedBuilding'
                      value={formData.RecoveryAndDamagedDestroyedBuilding[0]?.damagedDestroyedBuilding}
                      onChange={handleChange}
                      style={inputStyle} required />
                  </div>
                  <div className='w-2xl'>
                    <p className='text-gray-500'>Recovery Measures</p>
                    <input
                      name='recoveryMeasures'
                      value={formData.RecoveryAndDamagedDestroyedBuilding[0]?.recoveryMeasures}
                      onChange={handleChange}
                      placeholder="e.g, Recovery Measures"
                      style={inputStyle} required />
                  </div>
                  <div className='w-3xl'>
                    <p className='text-gray-500'>Funding Source</p>
                    <input
                      placeholder="e.g, Funding Source"
                      name='fundingSource'
                      value={formData.RecoveryAndDamagedDestroyedBuilding[0]?.fundingSource}
                      onChange={handleChange}
                      style={inputStyle} required />
                  </div>
                </div>
                <div>
                  <p className='text-gray-500'>Implementing Agency</p>
                  <input
                    placeholder="e.g, Implementing Agency"
                    name='implementingAgency'
                    value={formData.RecoveryAndDamagedDestroyedBuilding[0]?.implementingAgency}
                    onChange={handleChange}
                    style={inputStyle} required />
                </div>
                <div className='flex gap-4'>
                  <div className='w-4xl'>
                    <p className='text-gray-500'>Tentative Duration (Months)</p>
                    <input
                      placeholder="e.g, Tentative Duration (Months)"
                      name='tentativeDurationMonths'
                      value={formData.RecoveryAndDamagedDestroyedBuilding[0]?.tentativeDurationMonths}
                      onChange={handleChange}
                      style={inputStyle} required />
                  </div>
                  <div className='w-3xl'>
                    <p className='text-gray-500'>Budget</p>
                    <input
                      name='budget'
                      value={formData.RecoveryAndDamagedDestroyedBuilding[0]?.budget}
                      onChange={handleChange}
                      placeholder="e.g 5000"
                      style={inputStyle} required />
                  </div>
                  <div className='w-2xl'>
                    <p className='text-gray-500'>Responsible Officer</p>
                    <input
                      placeholder="e.g, Responsible Officer"
                      name='responsibleOfficer'
                      value={formData.RecoveryAndDamagedDestroyedBuilding[0]?.responsibleOfficer}
                      onChange={handleChange}
                      style={inputStyle} required />
                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    },
    {
      id:8,
      label:"Functioning of Education",
      content:(
        <div className='container'>
          <h2 style={headingStyle}>Functioning of Education</h2>
            <div style={sectionStyle}>
              <div className='flex gap-4'>
                <div className='w-2xl'>
                  <p className='text-gray-500'>Identified alternate Location for school Education</p>
                  <input
                    placeholder="e.g, identified alternate location"
                    name='alterateSchoolLocation'
                    value={formData.FunctioningOfEducation[0]?.alterateSchoolLocation}
                    onChange={handleChange}
                    style={inputStyle} required />
                </div>
                <div className='w-2xl'>
                  <p className='text-gray-500'>Provisions for Online Education</p>
                  <input
                    name='provisionForOnlineEducation'
                    value={formData.FunctioningOfEducation[0]?.provisionForOnlineEducation}
                    onChange={handleChange}
                    placeholder="e.g, provisions for online education"
                    style={inputStyle} required />
                </div>
              </div>
              <div className='flex gap-4'>
                <div className='w-2xl'>
                  <p className='text-gray-500'>Funding source to meet expenditure</p>
                  <input
                    placeholder="e.g, funding source to meet expenditure"
                    name='fundingSourceToMeetExpenditure'
                    value={formData.FunctioningOfEducation[0]?.fundingSourceToMeetExpenditure}
                    onChange={handleChange}
                    style={inputStyle} required />
                </div>
                <div className='w-2xl'>
                  <p className='text-gray-500'>Responsibility</p>
                  <input
                    placeholder="e.g,Responsibility"
                    name='responsibility'
                    value={formData.FunctioningOfEducation[0]?.responsibility}
                    onChange={handleChange}
                    style={inputStyle} required />
                </div>
              </div>


            </div>
        </div>
      )
    },
    {
      id:9,
      label:"Monthly CheckList Review",
      content:(
        <div className='container'>
           <h2 style={headingStyle}>Monthly/Quarterly Checklist Reviews</h2>
            <div style={sectionStyle}>
              <div className="flex gap-4 mb-4">
                <div className="w-2xl">
                  <p className="text-gray-500">Review Date</p>
                  <input
                    type="date"
                    name='MonthlyQuarterlyReview.0.reviewDate'
                    value={formData.MonthlyQuarterlyReview[0]?.reviewDate || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    className="text-gray-500"
                    required
                  />
                </div>
                <div className="w-2xl">
                  <p className="text-gray-500">Review Type</p>
                  <select
                    name='MonthlyQuarterlyReview.0.reviewType'
                    value={formData.MonthlyQuarterlyReview[0]?.reviewType || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    className="text-gray-500"
                    required
                  >
                    <option value="">Select Review Type</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annual">Annual</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-500">Checklist Name</p>
                <input
                  placeholder="Enter checklist name"
                  style={inputStyle}
                  name='MonthlyQuarterlyReview.0.checklistName'
                  value={formData.MonthlyQuarterlyReview[0]?.checklistName || ''}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='flex gap-4 mb-4'>
                <div className="w-2xl">
                  <p className="text-gray-500">Status</p>
                  <select
                    name='MonthlyQuarterlyReview.0.status'
                    value={formData.MonthlyQuarterlyReview[0]?.status || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    className="text-gray-500"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
                <div className="w-2xl">
                  <p className="text-gray-500">Next Review Date</p>
                  <input
                    type="date"
                    name='MonthlyQuarterlyReview.0.nextReviewDate'
                    value={formData.MonthlyQuarterlyReview[0]?.nextReviewDate || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    className="text-gray-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-500">Reviewed By</p>
                <input
                  placeholder="Enter reviewer name"
                  name='MonthlyQuarterlyReview.0.reviewedBy'
                  value={formData.MonthlyQuarterlyReview[0]?.reviewedBy || ''}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <p className="text-gray-500">Remarks/Action Needed</p>
                <textarea
                  placeholder="Enter remarks or actions needed"
                  name='MonthlyQuarterlyReview.0.remarks'
                  value={formData.MonthlyQuarterlyReview[0]?.remarks || ''}
                  onChange={handleChange}
                  style={{ ...inputStyle, minHeight: "80px" }}
                  className="resize-none"
                  required
                />
              </div>
            </div>
        </div>
      )
    },
    {
      id:10,
      label:"Feedback Mechanism & Community Validation",
      content:(
        <div className='container'>
           <h2 style={headingStyle}>Feedback Mechanism & Community Validation</h2>
              <div style={sectionStyle}>
                <label htmlFor="Feedback source">Feedback Source </label>
                <input
                  placeholder=" (e.g., PTM)"
                  name='FeedbackSource'
                  value={formData.FeedBackMechanismCommunityValidation[0]?.FeedbackSource}
                  onChange={handleChange}
                  style={inputStyle} required />
                <div className='flex gap-4'>
                  <label htmlFor="Date">Date Received</label>
                  <input
                    placeholder="Date Received (e.g., 23/05/2025)"
                    name='DateReceived'
                    value={formData.FeedBackMechanismCommunityValidation[0]?.DateReceived}
                    onChange={handleChange}
                    style={inputStyle} required />
                    <label htmlFor="Feedback Summary">Feedback Summary</label>
                  <input
                    placeholder="Feedback Summary (e.g., request to change water tanks)"
                    name='FeedBackSummary'
                    value={formData.FeedBackMechanismCommunityValidation[0]?.FeedBackSummary}
                    onChange={handleChange}
                    style={inputStyle} required />
                    <label htmlFor="ActionTaken">Action Taken</label>
                  <input
                    name='ActionTaken'
                    value={formData.FeedBackMechanismCommunityValidation[0]?.ActionTaken}
                    onChange={handleChange}
                    placeholder="Action Taken (e.g., water tank changed)" style={inputStyle} required />
                </div>
                <label htmlFor="Validatebycommunity">Validate By Community</label>
                <input
                  placeholder="Validated By Community? (Yes/No)"
                  name='ValidateByCommunity'
                  value={formData.FeedBackMechanismCommunityValidation[0]?.ValidateByCommunity}
                  onChange={handleChange}
                  style={inputStyle} required />
              </div>
        </div>
      )
    },
    {
      id:11,
      label:"Psychological Recovery",
      content:(
        <div className='container'>
 <h2 style={headingStyle}>Psychological Recovery</h2>
              <div style={sectionStyle}>
                <div className="mb-4">
                  <p className="text-gray-500" style={{}}>No. of Students</p>
                  <input
                    type="number"
                    placeholder="No. of Student's"
                    name='PsychologicalRecovery.0.noOfStudents'
                    value={formData.PsychologicalRecovery[0]?.noOfStudents || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>

                <div className="mb-4">
                  <p className="text-gray-500">Teacher's Staff Need</p>
                  <input
                    placeholder="Teacher's Staff need"
                    name='PsychologicalRecovery.0.teacherStaffNeed'
                    value={formData.PsychologicalRecovery[0]?.teacherStaffNeed || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>

                <div className='flex gap-4 mb-4'>
                  <div className="flex-1">
                    <p className="text-gray-500">Name of Counselors</p>
                    <input
                      placeholder="Name of counselors"
                      name='PsychologicalRecovery.0.nameOfCounselors'
                      value={formData.PsychologicalRecovery[0]?.nameOfCounselors || ''}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500">Contact No. of Counselors</p>
                    <input
                      type="text"
                      placeholder="Contact no. of counselors"
                      name='PsychologicalRecovery.0.contactNoOfcounselors'
                      value={formData.PsychologicalRecovery[0]?.contactNoOfcounselors || ''}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500">Location's Address of the Clinics of Counselors</p>
                  <textarea
                    placeholder="Location's Address of the Clinics of Counselors"
                    name='PsychologicalRecovery.0.counselorsAddress'
                    value={formData.PsychologicalRecovery[0]?.counselorsAddress || ''}
                    onChange={handleChange}
                    style={{ ...inputStyle, minHeight: "80px" }}
                    className="resize-none"
                    required
                  />
                </div>

                <div>
                  <p className="text-gray-500">Counselors Responsibility</p>
                  <textarea
                    placeholder="Responsibility"
                    name='PsychologicalRecovery.0.counselorsResponsibility'
                    value={formData.PsychologicalRecovery[0]?.counselorsResponsibility || ''}
                    onChange={handleChange}
                    style={{ ...inputStyle, minHeight: "80px" }}
                    className="resize-none"
                    required
                  />
                </div>
              </div>
        </div>
      )
    }
       

  
,
{
  id:12,
  label:"Reporting and Documentation",
  content:(
    <div className='container'>
        <h2 style={headingStyle}>Reporting and Documentation: Recovery of Equipment/Furniture</h2>
              <div style={sectionStyle}>
                <div className='flex gap-4'>
                  <div className='w-2xl'>
                    <p className='text-gray-500'>Damaged/Destroyed Equipment/Furniture</p>
                    <input
                      placeholder="e.g, Damaged/Destroyed Equipment/Furniture"
                      name='RecoveryAndEquipmentFurniture.0.damagedDestroyedEquipmentFurniture'
                      value={formData.RecoveryAndEquipmentFurniture[0]?.damagedDestroyedEquipmentFurniture || ''}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div className='w-2xl'>
                    <p className='text-gray-500'>Recovery Measures</p>
                    <input
                      placeholder="e.g, Recovery Measures"
                      name='RecoveryAndEquipmentFurniture.0.recoveryMeasures'
                      value={formData.RecoveryAndEquipmentFurniture[0]?.recoveryMeasures || ''}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='w-2xl'>
                    <p className='text-gray-500'>Funding Source</p>
                    <input
                      placeholder="Funding Source"
                      name='RecoveryAndEquipmentFurniture.0.fundingSource'
                      value={formData.RecoveryAndEquipmentFurniture[0]?.fundingSource || ''}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div className='w-2xl'>
                    <p className='text-gray-500'>Implementing Agency</p>
                    <input
                      placeholder="Implementing Agency"
                      name='RecoveryAndEquipmentFurniture.0.implementingAgency'
                      value={formData.RecoveryAndEquipmentFurniture[0]?.implementingAgency || ''}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </div>
                </div>

                <div className='flex gap-4'>
                  <div className='w-2xl'>
                    <p className='text-gray-500'>Tentative Duration (Months)</p>
                    <input
                      type="number"
                      placeholder="Tentative Duration (Months)"
                      name='RecoveryAndEquipmentFurniture.0.tentativeDurationMonths'
                      value={formData.RecoveryAndEquipmentFurniture[0]?.tentativeDurationMonths || 0}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </div>
                  <div className='w-2xl'>
                    <p className='text-gray-500'>Budget</p>
                    <input
                      type="number"
                      placeholder="Budget"
                      name='RecoveryAndEquipmentFurniture.0.budget'
                      value={formData.RecoveryAndEquipmentFurniture[0]?.budget || 0}
                      onChange={handleChange}
                      style={inputStyle}
                      required
                    />
                  </div>
                </div>

                <div className='w-2xl'>
                  <p className='text-gray-500'>Responsible Officer</p>
                  <input
                    placeholder="Responsible Officer"
                    name='RecoveryAndEquipmentFurniture.0.responsibleOfficer'
                    value={formData.RecoveryAndEquipmentFurniture[0]?.responsibleOfficer || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
    </div>
  )
},
 
{
  id:13,
  label:"Plan Updation Cycle (Every 6 months or post-incident)",
  content:(
    <div className='container'>
         <h2 style={headingStyle}>Plan Updation Cycle (Every 6 months or post-incident)</h2>
            <div style={sectionStyle}>
              <div className="mb-4">
                <p className="text-gray-500">Version/Date</p>
                <input
                  type="date"
                  placeholder="Version/Date (e.g., 01/01/2025)"
                  name='PlanUpdationCycle.0.versionDate'
                  value={formData.PlanUpdationCycle[0]?.versionDate || ''}
                  onChange={handleChange}
                  style={inputStyle}
                  className="text-gray-500"
                  required
                />
              </div>

              <div className='flex gap-4 mb-4'>
                <div className="flex-1">
                  <p className="text-gray-500">Update Trigger</p>
                  <input
                    placeholder="Update Trigger (e.g., lack of water tanker)"
                    name='PlanUpdationCycle.0.updateTrigger'
                    value={formData.PlanUpdationCycle[0]?.updateTrigger || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
                <div className="flex-1">
                  <p className="text-gray-500">Key Changes Made</p>
                  <input
                    placeholder="Key Changes Made (e.g., changed water tanker)"
                    name='PlanUpdationCycle.0.keyChangesMade'
                    value={formData.PlanUpdationCycle[0]?.keyChangesMade || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-500">Reviewed By</p>
                <input
                  placeholder="Reviewed By (e.g., Police)"
                  name='PlanUpdationCycle.0.reviewedBy'
                  value={formData.PlanUpdationCycle[0]?.reviewedBy || ''}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <p className="text-gray-500">Next Scheduled Update</p>
                <input
                  type="date"
                  name='PlanUpdationCycle.0.nextScheduledUpdate'
                  value={formData.PlanUpdationCycle[0]?.nextScheduledUpdate || ''}
                  onChange={handleChange}
                  placeholder="Next Scheduled Update (e.g., 08/08/2026)"
                  style={inputStyle}
                  className="text-gray-500"
                  required
                />
              </div>
            </div>
    </div>
  )
},
 {
  id:14,
  label:"",
  content:(
    <div className='container'>
      <h2 style={headingStyle}>Team for Students with Special needs (IF CHILDREN ARE THERE)</h2>
              <div style={sectionStyle}>
                <label htmlFor="Name">Team member Name</label>
                <input
                  placeholder="Name of Team Member"
                  name='nameOfTeamMember'
                  value={formData.TeamForStudentsSpecialNeed[0]?.nameOfTeamMember}
                  onChange={handleChange}
                  style={inputStyle} required />
                <label htmlFor="Designation">Designation</label>
                <input
                  placeholder="eg:abc"
                  name='memberDesignation'
                  value={formData.TeamForStudentsSpecialNeed[0]?.memberDesignation}
                  onChange={handleChange}
                  style={inputStyle} required />
                <div className='flex gap-4'>
                  <label htmlFor="Address">Address</label>
                  <input
                    placeholder="eg:jkasdashd "
                    name='memberAddress'
                    value={formData.TeamForStudentsSpecialNeed[0]?.memberAddress}
                    onChange={handleChange}
                    style={inputStyle} required />
                    <label htmlFor="contactno">Contact No</label>
                  <input
                    placeholder="Contact No"
                    name='memberContactno'
                    value={formData.TeamForStudentsSpecialNeed[0]?.memberContactno}
                    onChange={handleChange}
                    style={inputStyle} required />
                    <label htmlFor="Nameofstudent">Name of Student</label>
                  <input
                    placeholder="Name Of the Student"
                    name='nameOftheStudent'
                    value={formData.TeamForStudentsSpecialNeed[0]?.nameOftheStudent}
                    onChange={handleChange}
                    style={inputStyle} required />
                </div>
                <label htmlFor="contact">Contact number of the student</label>
                <input
                  placeholder="eg:9876543210"
                  name='studentContactNo'
                  value={formData.TeamForStudentsSpecialNeed[0]?.studentContactNo}
                  onChange={handleChange}
                  style={inputStyle} required />
                  <label htmlFor="Address">Address of the Student</label>
                <input
                  placeholder="eg:xyz"
                  name='studentAddress'
                  value={formData.TeamForStudentsSpecialNeed[0]?.studentAddress}
                  onChange={handleChange}
                  style={inputStyle} required />
              </div>
    </div>
  )
 },
    {
      id: 15,
      // label: 'First Aid Directory',
      // icon: <Heart className="w-4 h-4" />,
      content: (
        <div className='container'>
          <div className='container'>
            <section className="mb-8 h-auto">
             
             
              
              <h2 style={headingStyle}>Disaster/ Accident Reporting Format</h2>
              <div style={sectionStyle}>
                {/* 1. Name of School */}
                <div className="mb-4">
                  <h1 className="text-[#808080]" style={{ fontSize: "16px", color: 'black' }}>Name of School</h1>
                  <input
                    placeholder="Enter school name"
                    name='DisasterAccidentReporting.0.schoolName'
                    value={formData.DisasterAccidentReporting[0]?.schoolName || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>

                {/* 2. Address */}
                <div className="mb-4">
                  <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Address</h1>
                  <textarea
                    placeholder="Enter address"
                    name='DisasterAccidentReporting.0.schoolAddress'
                    value={formData.DisasterAccidentReporting[0]?.schoolAddress || ''}
                    onChange={handleChange}
                    style={{ ...inputStyle, minHeight: "60px" }}
                    className="resize-none"
                    required
                  />
                </div>

                {/* 3. Contact */}
                <div className="mb-4">
                  <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Contact</h1>
                  <input
                    type="tel"
                    placeholder="Enter contact number"
                    name='DisasterAccidentReporting.0.contactNumber'
                    value={formData.DisasterAccidentReporting[0]?.contactNumber || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>

                {/* 4. Date and Time */}
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Incident Date</h1>
                    <input
                      type="date"
                      name='DisasterAccidentReporting.0.incidentDate'
                      value={formData.DisasterAccidentReporting[0]?.incidentDate || ''}
                      onChange={handleChange}
                      style={inputStyle}
                      className="text-gray-500"
                      required
                    />
                  </div>
                  {/* <div className="flex-1">
                <h1 className="text-gray-500">Incident Time</h1>
                <input
                  type="time"
                  name='DisasterAccidentReporting.0.incidentTime'
                  value={formData.DisasterAccidentReporting[0]?.incidentTime || ''}
                  onChange={handleChange}
                  style={inputStyle}
                  className="text-gray-500"
                  required
                />
              </div> */}
                </div>

                {/* 6. Type of Disaster/ Accident */}
                <div className="mb-4">
                  <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Type of Disaster/ Accident</h1>
                  <input
                    placeholder="Enter type of disaster/accident"
                    name='DisasterAccidentReporting.0.disasterType'
                    value={formData.DisasterAccidentReporting[0]?.disasterType || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>

                {/* 7. No. of Affected persons */}
                <div className="mb-4">
                  <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Total Affected Persons</h1>
                  <input
                    type="number"
                    placeholder="Enter number of affected persons"
                    name='DisasterAccidentReporting.0.totalAffectedPersons'
                    value={formData.DisasterAccidentReporting[0]?.totalAffectedPersons || 0}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>

                {/* 8. Deaths */}
                <div className="mb-4">
                  <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Deaths (if any)</h1>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm mb-1" style={{fontSize: "16px", color: 'black'}}>Teaching Staff</p>
                      <input
                        type="number"
                        name='deaths_teachingStaff'
                        value={formData.DisasterAccidentReporting[0]?.deaths?.teachingStaff || 0}
                        onChange={handleChange}
                        placeholder="Teaching Staff"
                        style={inputStyle}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm mb-1" style={{ fontSize: "16px", color: 'black' }}>Students</p>
                      <input
                        type="number"
                        placeholder="Students"
                        name='deaths_students'
                        value={formData.DisasterAccidentReporting[0]?.deaths?.students || 0}
                        onChange={handleChange}
                        style={inputStyle}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm mb-1" style={{ fontSize: "16px", color: 'black' }}>Non-Teaching Staff</p>
                      <input
                        type="number"
                        name='deaths_nonTeachingStaff'
                        value={formData.DisasterAccidentReporting[0]?.deaths?.nonTeachingStaff || 0}
                        onChange={handleChange}
                        placeholder="Non-Teaching Staff"
                        style={inputStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* 9. Injured */}
                <div className="mb-4">
                  <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Total Injured</h1>
                  <input
                    type="number"
                    placeholder="Enter number of injured persons"
                    name='DisasterAccidentReporting.0.totalInjured'
                    value={formData.DisasterAccidentReporting[0]?.totalInjured || 0}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>


                <div className="mb-4">
                  <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Loss of Property</h1>
                  <textarea
                    placeholder="Describe loss of property"
                    name='DisasterAccidentReporting.0.lossOfProperty'
                    value={formData.DisasterAccidentReporting[0]?.lossOfProperty || ''}
                    onChange={handleChange}
                    style={{ ...inputStyle, minHeight: "80px" }}
                    className="resize-none"
                    required
                  />
                </div>


                <div className="mb-4">
                  <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Response Agencies</h1>
                  <input
                    placeholder="Enter response agencies"
                    name='DisasterAccidentReporting.0.responseAgencies'
                    value={formData.DisasterAccidentReporting[0]?.responseAgencies || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>


                <div className="mb-4">
                  <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Description of the Event</h1>
                  <textarea
                    placeholder="Describe the event"
                    name='DisasterAccidentReporting.0.eventDescription'
                    value={formData.DisasterAccidentReporting[0]?.eventDescription || ''}
                    onChange={handleChange}
                    style={{ ...inputStyle, minHeight: "100px" }}
                    className="resize-none"
                    required
                  />
                </div>

                <div className="mb-4">
                  <h1 className="text-gray-500" style={{ fontSize: "16px", color:'black' }}>Description of the Response</h1>
                  <textarea
                    placeholder="Describe the response"
                    name='DisasterAccidentReporting.0.responseDescription'
                    value={formData.DisasterAccidentReporting[0]?.responseDescription || ''}
                    onChange={handleChange}
                    style={{ ...inputStyle, minHeight: "100px" }}
                    className="resize-none"
                    required
                  />
                </div>

                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Reported By</h1>
                    <input
                      placeholder="Enter reporter name"
                      name='DisasterAccidentReporting.0.reportedBy'
                      value={formData.DisasterAccidentReporting[0]?.reportedBy || ''}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Report Date</h1>
                    <input
                      type="date"
                      name='DisasterAccidentReporting.0.reportedDate'
                      value={formData.DisasterAccidentReporting[0]?.reportedDate || ''}
                      onChange={handleChange}
                      style={inputStyle}
                      className="text-gray-500"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <h1 className="text-gray-500" style={{ fontSize: "16px", color: 'black' }}>Status</h1>
                  <select
                    name='DisasterAccidentReporting.0.status'
                    value={formData.DisasterAccidentReporting[0]?.status || ''}
                    onChange={handleChange}
                    style={inputStyle}
                    className="text-gray-500"
                  >
                    <option value="">Select Status</option>
                    <option value="Draft">Draft</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Under Investigation">Under Investigation</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>


            </section>
          </div>
        </div>
      )
    },
    {
      id: 16,
      // label: 'First Aid Directory',
      // icon: <Heart className="w-4 h-4" />,

      content: (

        <div className='container'>
          <div className='container'>
            <section className="mb-8 h-auto">
              <h2 style={headingStyle}>Dos and Don’ts</h2>
              <div style={sectionStyle} className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-500">
                      <th className="border border-gray-300 p-2 text-left">S.No.</th>
                      <th className="border border-gray-300 p-2 text-left">Dos</th>
                      <th className="border border-gray-300 p-2 text-left">Don’ts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "Develop an escape plan and ensure everyone knows it.",
                        "Don’t overload sockets with multiple electrical devices",
                      ],
                      [
                        "Display all Emergency Support Functionaries' numbers and the Evacuation Map on all floors and at strategic locations",
                        "Never allow children to handle a matchbox/lighter",
                      ],
                      [
                        "Always follow the NBC building bylaws.",
                        "Don’t keep expired fire extinguishers or leave them unused for years.",
                      ],
                      [
                        "Set out a proper alarm system, Install smoke detectors or alarm systems, especially in high-risk zones.",
                        "Don’t store paper materials near power points or heaters.",
                      ],
                      [
                        "Keep the escape route free from any blockage",
                        "Don’t block staircases, corridors, or exit paths with furniture or waste materials.",
                      ],
                      [
                        "Train teachers and staff in first aid and fire safety procedures",
                        "Don’t ignore maintenance of exhaust, ventilation, and gas safety in labs/canteens.",
                      ],
                      [
                        "Keep a first aid kit and keep it ready at an easily accessible location.",
                        "Don’t install temporary plastic/tin sheds without fire safety checks",
                      ],
                      [
                        "Keep flammable materials (chemicals, papers) away from electrical points.",
                        "Don’t allow vendors or autos to park near the main gate, blocking evacuation.",
                      ],
                      [
                        `In case of fire
- Protect yourself and your friends - Stay Calm, Don't Panic.
- Raise Alarm and Alert Everyone.
- Use the nearest Exit Routes.
- Close Doors and Windows behind You.
- Use Staircases, Not Lifts.
- Never stand up, but always crawl low on the ground and keep your face covered. 
- Attract the attention of the Rescue Team by making a loud noise.`,
                        "Don’t delay repairs of broken fans, switches, or emergency lights.",
                      ],
                      [
                        "During normal times, look out for old wiring & broken electrical fittings. Report any hazardous conditions to your electrician.",
                        "Don’t assume the playground or outer areas are automatically safe during disasters.",
                      ],
                      [
                        "Use fire-rated electrical equipment and proper earthing in labs/computer rooms.",
                        "Don’t keep electrical rooms locked and unchecked for years.",
                      ],
                      [
                        "In case anyone is caught on fire: Always STOP, DROP, and ROLL. Roll over the ground to put off the fire.",
                        "Don’t allow the burning of garbage near school boundaries.",
                      ],
                    ].map((row, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2 text-gray-500">{index + 1}</td>
                        <td className="border border-gray-300 p-2 whitespace-pre-line text-gray-500">{row[0]}</td>
                        <td className="border border-gray-300 p-2 text-gray-500">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>
                <TablePagination
                  component="div"
                  count={formData.ResourceAndEquipmentLog.length}
                  page={pagination.page}
                  onPageChange={handleChangePage}
                  rowsPerPage={pagination.rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5]}    // To allow only 5 per page
                />

              </div>


              <div style={{ marginTop: '30px', marginBottom: '30px', textAlign: 'center' }}>
                <a href="#" style={{ color: '#fff', backgroundColor: '#f27f22', padding: '12px 24px', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
                  Read / Download Do's and Don'ts
                </a>
                <div className='relative top-4'>
                  <button className='h-10 w-28  rounded-md gap-2 bg-[#8BAE3F] text-white font-semibold cursor-pointer h-20 w-40  border-green-700' onClick={handleSubmit} type='submit' style={{ height: "40px", width: "100px", marginTop: "10px", borderRadius: "10px", backgroundColor: "#f27f22" }}>Submit</button>
                </div>
              </div>

            </section>
          </div>
        </div>
      )
    },



  ];

  return (

    <>
   <div className='container'>
  {/* Updated ProgressBar with overallProgress */}
  <ProgressBar 
    completed={overallProgress} 
    showLabel={true}
  />
  
  <div className="max-w-6xl mx-auto p-6 bg-white">
    
    {/* Step Progress Bar with Dynamic Colors */}
    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
      <div 
        className={`h-2 rounded-full transition-all duration-500 ${
          stepProgress[activeTab] === 100 ? '#ea580c' : 
          stepProgress[activeTab] >= 75 ? '#ea580c' :
          stepProgress[activeTab] >= 50 ? '#ea580c' :
          stepProgress[activeTab] >= 25 ? '#ea580c' :
          stepProgress[activeTab] > 0 ? '#ea580c' : '#ea580c'
        }`}
        style={{ width: `${stepProgress[activeTab] || 0}%` }}
      />
    </div>
    
    {/* Overall Progress Summary with Dynamic Colors */}
    {/* <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Overall Progress:</span>
        <span className="text-sm font-bold text-gray-800">{overallProgress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-700 ${
            overallProgress === 100 ? '#ea580c' : 
            overallProgress >= 75 ? '#ea580c' :
            overallProgress >= 50 ? '#ea580c' :
            overallProgress >= 25 ? '#ea580c' :
            overallProgress > 0 ? '#ea580c' : '#ea580c'
          }`}
          style={{ width: `${overallProgress}%` }}
        />
      </div>
    </div> */}

    {/* Tab Content */}
    <div className="min-h-screen w-screen">
      <div className="w-full p-2" style={{ padding: "46px", width: "100%" }}>
        {tabs[activeTab].content}
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="flex flex-col items-center mt-8 pt-6 border-t border-gray-200">
      
      {/* Navigation Buttons - Fixed Flex Layout */}
      <div className="flex justify-between items-start gap-4 w-full max-w-md">
        
        {/* Previous Button */}
        <button
          onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
          disabled={activeTab === 0}
          style={{
            height: "40px",
            width: "100px",
            borderRadius: "10px",
            backgroundColor: activeTab === 0 ? "#9CA3AF" : "#f27f22",
            color: "white",
            border: "2px solid",
            borderColor: activeTab === 0 ? "#6B7280" : "#ea580c",
            cursor: activeTab === 0 ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            fontWeight: "500"
          }}
        >
          Previous
        </button>

        {/* Next/Submit Button with validation warning */}
        <div className="flex flex-col items-center">
          {(() => {
            const currentStepStatus = getStepStatus(activeTab);
            const isLastStep = activeTab === Object.keys(stepValidations).length - 1;
            const canProceed = currentStepStatus.percentage === 100;
            
            return (
              <>
                {!canProceed && (
                  <div className="text-xs text-orange-600 mb-2 text-center max-w-48">
                    Complete all required fields to proceed
                  </div>
                )}
                
                <button
                  onClick={() => {
                    if (isLastStep) {
                      if (overallProgress === 100) {
                        console.log("Form is complete! Ready to submit.");
                      } else {
                        alert(`Form is ${overallProgress}% complete. Please complete all required fields before submitting.`);
                      }
                    } else {
                      setActiveTab(Math.min(Object.keys(stepValidations).length - 1, activeTab + 1));
                    }
                  }}
                  disabled={activeTab === Object.keys(stepValidations).length - 1 && overallProgress < 100}
                  style={{
                    height: "40px",
                    width: "100px",
                    borderRadius: "10px",
                    backgroundColor: 
                      (isLastStep && overallProgress < 100) ? "#9CA3AF" :
                      isLastStep ? "#10B981" : "#dd9306",
                    color: "white",
                    border: "2px solid",
                    borderColor: 
                      (isLastStep && overallProgress < 100) ? "#6B7280" :
                      isLastStep ? "#059669" : "#b45309",
                    cursor: 
                      (isLastStep && overallProgress < 100) ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    fontWeight: "500"
                  }}
                >
                  {isLastStep ? 'Submit' : 'Next'}
                </button>
              </>
            );
          })()}
        </div>
      </div>
      
      {/* Completion Status with Dynamic Color */}
      {overallProgress === 100 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <div className="text-green-800 font-medium">
            🎉 All steps completed! Ready to submit your form.
          </div>
        </div>
      )}
      
      {/* Progress Status Indicator */}
      {overallProgress > 0 && overallProgress < 100 && (
        <div className={`mt-4 p-3 rounded-lg text-center border ${
          overallProgress >= 75 ? 'bg-blue-50 border-blue-200' :
          overallProgress >= 50 ? 'bg-yellow-50 border-yellow-200' :
          overallProgress >= 25 ? 'bg-orange-50 border-orange-200' :
          'bg-red-50 border-red-200'
        }`}>
          <div className={`font-medium ${
            overallProgress >= 75 ? 'text-blue-800' :
            overallProgress >= 50 ? 'text-yellow-800' :
            overallProgress >= 25 ? 'text-orange-800' :
            'text-red-800'
          }`}>
            {overallProgress >= 75 ? '📊 Great progress! Almost there!' :
            overallProgress >= 50 ? '⚡ Halfway there! Keep going!' :
            overallProgress >= 25 ? '🎯 Good start! Continue filling out the form.' :
            '📝 Just getting started. Please complete the required fields.'}
          </div>
        </div>
      )}
    </div>
  </div>
</div>
    </>

  );
};

export default SSPFORM;
// pm921670@gmail.com
//  Password123!