import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=30,
        bottomMargin=30
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    name_style = ParagraphStyle(
        'NameStyle',
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=17,
        alignment=1, # Center
        textColor=colors.black
    )
    
    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=12,
        alignment=1,
        textColor=colors.HexColor('#222222')
    )
    
    contact_style = ParagraphStyle(
        'ContactStyle',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        alignment=1,
        textColor=colors.HexColor('#111111')
    )
    
    section_heading_style = ParagraphStyle(
        'SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.black,
        spaceAfter=2,
        spaceBefore=5
    )
    
    body_style = ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=8.2,
        leading=10.6,
        textColor=colors.HexColor('#222222')
    )
    
    bullet_style = ParagraphStyle(
        'Bullet',
        fontName='Helvetica',
        fontSize=8.1,
        leading=10.4,
        leftIndent=12,
        firstLineIndent=-12,
        textColor=colors.HexColor('#222222'),
        spaceAfter=2
    )

    story = []

    # Header
    story.append(Paragraph("KALAKONDA SAIRAM", name_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Software Developer | .NET, APIs &amp; AI-Assisted Engineering", subtitle_style))
    story.append(Spacer(1, 2))
    contact_html = '<a href="mailto:sairamkalakonda1998@gmail.com" color="#004488">sairamkalakonda1998@gmail.com</a> | <a href="https://linkedin.com/in/sairam-kalakonda" color="#004488">linkedin.com/in/sairam-kalakonda</a> | +91 7013883110'
    story.append(Paragraph(contact_html, contact_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#333333'), spaceAfter=4))

    # Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#888888'), spaceAfter=3))
    summary_text = (
        "Developer with 4+ years of experience designing, building, and maintaining software components, APIs, and internal tools using C#, "
        "ASP.NET MVC, and Entity Framework, with a strong foundation in object-oriented design, architectural patterns, and database schema "
        "development across SAP HANA SQL and SQL Server. Experienced integrating AI-assisted coding tools (Codex, Antigravity) into daily "
        "development work to accelerate code drafts, test generation, and documentation, while validating every output for correctness, "
        "security, and maintainability before use. Comfortable translating business and user requirements into tested, documented, "
        "maintainable solutions, and collaborating with cross-functional, remote teams including business stakeholders, QA, and infrastructure partners."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))

    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#888888'), spaceAfter=3))
    
    skills_data = [
        "<b>Programming Languages:</b> C#, Python, Java, JavaScript",
        "<b>Web &amp; API Development:</b> ASP.NET MVC, .NET Core, WCF, SAP B1 Service Layer (REST APIs), HTML, CSS, Bootstrap, jQuery",
        "<b>Database &amp; Data:</b> SAP HANA SQL, SQL Server, MySQL, SQLScript, Database Schema Design",
        "<b>AI-Assisted Development:</b> Codex, Antigravity, AI Copilot Integration, AI-Output Validation &amp; Review",
        "<b>Testing &amp; Version Control:</b> Git, Unit Testing, Automated Testing, Debugging &amp; Troubleshooting",
        "<b>Development Practices:</b> Object-Oriented Design, Architectural Design Patterns, Agile, WPF"
    ]
    for s in skills_data:
        story.append(Paragraph(s, body_style))
        story.append(Spacer(1, 1.5))
    story.append(Spacer(1, 3))

    # Professional Experience
    story.append(Paragraph("PROFESSIONAL EXPERIENCE", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#888888'), spaceAfter=3))

    # Role 1: 10X Software Solutions
    r1_header = Paragraph("<b>Technical Consultant (Web Developer)</b> | 10X Software Solutions", body_style)
    r1_date = Paragraph("<b>Aug 2023 - Present</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))
    r1_table = Table([[r1_header, r1_date]], colWidths=[380, 160])
    r1_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(r1_table)

    r1_bullets = [
        "<b>Software Development:</b> Developed, tested, and maintained .NET components, internal tools, and REST APIs across the SAP B1 ecosystem, applying object-oriented principles and architectural design patterns to keep solutions reusable and maintainable.",
        "<b>AI-Assisted Development:</b> Used AI coding tools (Codex, Antigravity) to draft code, generate tests, and produce documentation, validating each output for correctness, security, and alignment with internal standards before deployment.",
        "<b>Intelligent Automation:</b> Architected and integrated an AI Copilot into SAP B1 web applications and built a WhatsApp-based bot for real-time approvals, automated reporting, and system alerts, translating business requirements into working automation.",
        "<b>HR-Facing System Delivery:</b> Leading end-to-end development of an Employee Self-Service (ESS) Portal (ASP.NET MVC + SAP HANA), a direct employee/HR-process-facing system, coordinating requirements and delivery with a remote, cross-functional team.",
        "<b>Database Engineering:</b> Designed database schemas and refined HANA stored procedures and queries to support core business processes, improving query response time by 30%.",
        "<b>Quality Assurance:</b> Implemented unit tests and automated testing practices to catch defects early, and participated in troubleshooting and code review to reduce production issues.",
        "<b>UI/UX Development:</b> Built responsive, accessible enterprise UI components using Syncfusion and jQuery event delegation."
    ]
    for b in r1_bullets:
        story.append(Paragraph(f"&bull; {b}", bullet_style))
    story.append(Spacer(1, 3))

    # Role 2: Wipro Limited
    r2_header = Paragraph("<b>Project Engineer (Web Developer)</b> | Wipro Limited", body_style)
    r2_date = Paragraph("<b>Mar 2021 - Nov 2022</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))
    r2_table = Table([[r2_header, r2_date]], colWidths=[380, 160])
    r2_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(r2_table)

    r2_bullets = [
        "<b>Backend Development:</b> Designed and optimized backend services using WCF and Entity Framework, reducing server resource consumption by 15%.",
        "<b>Requirements &amp; Planning:</b> Facilitated Agile requirement-gathering sessions, translating user stories and business requirements into working software delivered within established timelines.",
        "<b>Platform Delivery:</b> Spearheaded development of the Commercial LRD (Microsoft Store Checklist Platform), improving operational output by 25%.",
        "<b>Reliability:</b> Built and maintained high-performance web applications, troubleshooting issues across environments using logs and tests to increase platform stability and reduce page load times."
    ]
    for b in r2_bullets:
        story.append(Paragraph(f"&bull; {b}", bullet_style))
    story.append(Spacer(1, 3))

    # Key Accomplishments
    story.append(Paragraph("KEY ACCOMPLISHMENTS", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#888888'), spaceAfter=3))

    accomplishments = [
        "<b>AI-Assisted Engineering:</b> Built and validated production AI Copilot and WhatsApp automation features within SAP B1, direct, hands-on experience with the responsible AI-assisted development workflow this role calls for.",
        "<b>Intelligent Reporting:</b> Built an automated report generation tool integrated with SAP HANA that produces complex reports in multiple formats.",
        "<b>Scalability &amp; Reliability:</b> Refined system architecture and database design to support a 50% increase in user traffic without performance degradation.",
        "<b>Recognition:</b> Awarded Best Performer of the Quarter at 10X Software Solutions for driving project success and productivity."
    ]
    for a in accomplishments:
        story.append(Paragraph(f"&bull; {a}", bullet_style))
    story.append(Spacer(1, 3))

    # Education
    story.append(Paragraph("EDUCATION", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#888888'), spaceAfter=3))
    
    edu_header = Paragraph("<b>B. Tech, Computer Science and Engineering</b> | Kamala Institute of Technology and Science, Karimnagar", body_style)
    edu_date = Paragraph("<b>2016 - 2020</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))
    edu_table = Table([[edu_header, edu_date]], colWidths=[420, 120])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)

    doc.build(story)
    print(f"Generated PDF at {output_path}")

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_pdf = os.path.join(base_dir, 'public', 'K_Sairam_Resume.pdf')
    out_pdf = os.path.join(base_dir, 'out', 'K_Sairam_Resume.pdf')
    
    generate_pdf(public_pdf)
    if os.path.exists(os.path.dirname(out_pdf)):
        generate_pdf(out_pdf)
