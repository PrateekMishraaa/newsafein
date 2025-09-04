import React, { useEffect } from 'react'
import BreadCrumb from '../../../layout/BreadCrumb'

function TermsConditions() {
  useEffect(() => {
    window.scroll(0, 0)
  })
  return (
    <>
      <BreadCrumb heading={"Terms & Conditions"} />
      <div className='container'>
        {/* <span className="section-title-border"></span> */}
        <h2 className='text-center p-4'>Terms and Conditions: SafeinSchool.In</h2>
        <span className="section-title-border"></span>
        <p>These Terms and Conditions ("Agreement") govern your access and use of the
          safeinschool.in ("Website"), provided by [Govardhan Learning Cloud Pvt. Ltd] ("we," "us," or
          "our"). By accessing or using the Website, you agree to be bound by this Agreement. If you
          do not agree with these terms, please refrain from using the Website.</p>
        <h4 className='mt-4'>Acceptance of Terms</h4>
        <p>1. By accessing or using the Website, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions, along with our Privacy Policy. If you are using the Website on behalf of a school or organization, you represent and warrant that you have the authority to bind the school or organization to these Terms and Conditions.</p>

        <h4 className='mt-4'>User Eligibility</h4>
        <p>2. The Website is intended for use by school stakeholders, including administrators,
          teachers, staff members, and other individuals associated with educational
          institutions. By accessing and using the Website, you represent and warrant that you
          are at least 16 years of age or have obtained appropriate consent from a parent or
          legal guardian.
        </p>

        <h4 className='mt-4'>User Account and Security</h4>
        <p>3. To access certain features and courses on the Website, you may be required to
          create a user account. You are responsible for maintaining the confidentiality of your
          account information and for all activities that occur under your account. You agree to
          notify us immediately of any unauthorized use or security breaches related to your
          account. We reserve the right to suspend or terminate your account if we suspect any
          unauthorized access or misuse.</p>

        <h4 className='mt-4'>Website Content</h4>
        <p>4. The content provided on the Website, including but not limited to courses, training
          materials, resources, and compliance information, is for informational purposes only.
          We strive to ensure the accuracy and relevance of the content, but we make no
          warranties or guarantees regarding its completeness, reliability, or suitability for any
          particular purpose. You acknowledge that the content may not always reflect the
          most up-to-date information.</p>
        <p></p>

        <h4 className="mt-4">User Obligations</h4>
        <p>5. (a) Compliance: Users agree to comply with all applicable laws, regulations, and
          guidelines related to school safety and security. It is your responsibility to ensure that
          you meet all necessary compliance requirements and adhere to relevant safety
          protocols.</p>

        <h4 className="mt-4">(b) Prohibited Activities: You agree not to engage in any activities that may:</h4>
        <p className='lh-1'>i. Violate any applicable laws, regulations, or third-party rights.</p>
        <p className='lh-1'>ii. Interfere with the functioning of the Website or its infrastructure.</p>
        <p className='lh-1'>iii. Transmit any harmful, unlawful, or inappropriate content.</p>
        <p className='lh-1'>iv. Attempt to gain unauthorized access to the Website or other user accounts.</p>
        <p className='lh-1'>v. Use the Website for any commercial or non-personal purposes without our prior written consent</p>

        <h4 className="mt-4">6. Intellectual Property Rights</h4>
        <p>All intellectual property rights, including copyrights, trademarks, and trade secrets, in the
          Website and its content are owned by or licensed to us. You agree not to reproduce,
          distribute, modify, or create derivative works based on the Website's content without our
          express written permission.</p>

        <h4 className="mt-4">Disclaimer of Liability</h4>
        <p>7. (a) Use of the Website is at your own risk. We make no warranties or representations
          regarding the accuracy, reliability, or suitability of the content provided. The Website
          is provided on an "as is" and "as available" basis, without any warranties, expressed
          or implied.</p>

        <p>(b) We shall not be liable for any direct, indirect, incidental, consequential, or punitive
          damages arising from your use of the Website or any content therein. This includes but is
          not limited to, damages for loss of profits, data, or other intangible losses.</p>

        <h4 className="mt-4">Third-Party Links</h4>
        <p>8. The Website may contain links to third-party websites, applications, or resources that
          are not under our control. We are not responsible for the availability, content, or
          accuracy of these external sites. The inclusion of any link does not imply our
          endorsement or affiliation with the linked website.</p>

        <h4 className="mt-4">Modification and Termination</h4>
        <p>
          9. We reserve the right to modify or discontinue the Website, its features, or these
          Terms and Conditions at any time without prior notice. We may also suspend or
          terminate your access to the Website if we believe you have violated these terms or
          engaged in any unauthorized activities.</p>
        <p></p>

        <h4 className="mt-4">Governing Law and Jurisdiction</h4>
        <p>
          10. This Agreement shall be governed by and construed in accordance with the laws of
          the jurisdiction in which we operate. Any disputes arising out of or in connection with
          this Agreement shall be subject to the exclusive jurisdiction of the courts in that
          jurisdiction.</p>

        <h4 className="mt-4">Entire Agreement</h4>
        <p>
          11. These Terms and Conditions constitute the entire agreement between you and us
          regarding the use of the Website, superseding any prior agreements or
          understandings.</p>

        <p className='mt-4 mb-5'>If you have any questions or concerns regarding these Terms and Conditions, please contact
          us at myschool@safeinschool.in</p>
      </div>
    </>
  )
}

export default TermsConditions
