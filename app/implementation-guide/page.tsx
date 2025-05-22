"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Download, FileText, Shield, CheckCircle, Info } from "lucide-react"
import * as XLSX from "xlsx"

export default function ImplementationGuide() {
  const downloadAsExcel = () => {
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()

    // Prepare data for each category
    const highRiskData = highRiskSteps.map((item) => [item.title, item.description])
    const limitedRiskData = limitedRiskSteps.map((item) => [item.title, item.description])
    const minimalRiskData = minimalRiskSteps.map((item) => [item.title, item.description])
    const timelineData = timelineSteps.map((item) => [item.date, item.title, item.description])

    // Add headers
    highRiskData.unshift(["Step", "Description"])
    limitedRiskData.unshift(["Step", "Description"])
    minimalRiskData.unshift(["Step", "Description"])
    timelineData.unshift(["Date", "Milestone", "Description"])

    // Create worksheets
    const wsHighRisk = XLSX.utils.aoa_to_sheet(highRiskData)
    const wsLimitedRisk = XLSX.utils.aoa_to_sheet(limitedRiskData)
    const wsMinimalRisk = XLSX.utils.aoa_to_sheet(minimalRiskData)
    const wsTimeline = XLSX.utils.aoa_to_sheet(timelineData)

    // Apply styles to worksheets
    applyStyles(wsHighRisk, highRiskData.length, "amber")
    applyStyles(wsLimitedRisk, limitedRiskData.length, "blue")
    applyStyles(wsMinimalRisk, minimalRiskData.length, "green")
    applyStyles(wsTimeline, timelineData.length, "purple")

    // Add worksheets to workbook
    XLSX.utils.book_append_sheet(wb, wsHighRisk, "High-Risk AI")
    XLSX.utils.book_append_sheet(wb, wsLimitedRisk, "Limited-Risk AI")
    XLSX.utils.book_append_sheet(wb, wsMinimalRisk, "Minimal-Risk AI")
    XLSX.utils.book_append_sheet(wb, wsTimeline, "Implementation Timeline")

    // Generate Excel file as a binary string
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" })

    // Convert binary string to ArrayBuffer
    function s2ab(s: string) {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xff
      }
      return buf
    }

    // Create Blob and download
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "EU_AI_Act_Implementation_Guide.xlsx"
    document.body.appendChild(a)
    a.click()

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 0)
  }

  // Add this helper function for styling the worksheets
  const applyStyles = (worksheet: XLSX.WorkSheet, rowCount: number, colorTheme: string) => {
    // Define color themes
    const themes: Record<string, { header: string; alternateRow: string }> = {
      blue: { header: "4472C4", alternateRow: "D9E1F2" },
      amber: { header: "ED7D31", alternateRow: "FBE5D6" },
      green: { header: "70AD47", alternateRow: "E2EFDA" },
      purple: { header: "7030A0", alternateRow: "E4D7F0" },
    }

    const theme = themes[colorTheme] || themes.blue

    // Set column widths based on worksheet structure
    const colCount = XLSX.utils.decode_range(worksheet["!ref"] || "A1").e.c + 1

    if (colCount === 2) {
      // For the risk category worksheets (2 columns)
      worksheet["!cols"] = [{ wch: 35 }, { wch: 65 }]
    } else if (colCount === 3) {
      // For the timeline worksheet (3 columns)
      worksheet["!cols"] = [{ wch: 15 }, { wch: 30 }, { wch: 55 }]
    }

    // Get the range of the worksheet
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1")

    // Style header row
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: col })
      if (!worksheet[cellRef]) continue

      worksheet[cellRef].s = {
        fill: { fgColor: { rgb: theme.header }, patternType: "solid" },
        font: { bold: true, color: { rgb: "FFFFFF" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      }
    }

    // Style data rows
    for (let row = 1; row < rowCount; row++) {
      const isAlternateRow = row % 2 === 1
      const fillColor = isAlternateRow ? theme.alternateRow : "FFFFFF"

      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col })
        if (!worksheet[cellRef]) continue

        worksheet[cellRef].s = {
          fill: { fgColor: { rgb: fillColor }, patternType: "solid" },
          border: {
            top: { style: "thin", color: { rgb: "D3D3D3" } },
            bottom: { style: "thin", color: { rgb: "D3D3D3" } },
            left: { style: "thin", color: { rgb: "D3D3D3" } },
            right: { style: "thin", color: { rgb: "D3D3D3" } },
          },
          alignment: { vertical: "center", wrapText: true },
        }

        // Special formatting for date column in timeline
        if (col === 0 && colCount === 3) {
          worksheet[cellRef].s.font = { bold: true }
        }
      }
    }
  }

  const highRiskSteps = [
    {
      id: "high-1",
      title: "Risk Management System",
      description:
        "Establish a risk management system that runs throughout the entire lifecycle of the high-risk AI system.",
    },
    {
      id: "high-2",
      title: "Data Governance",
      description:
        "Implement data governance and management practices, including examination of possible biases, collection, processing and use of data.",
    },
    {
      id: "high-3",
      title: "Technical Documentation",
      description:
        "Prepare detailed technical documentation that demonstrates compliance with the requirements of the AI Act.",
    },
    {
      id: "high-4",
      title: "Record-Keeping",
      description: "Ensure automatic recording of events ('logs') while the high-risk AI systems are operating.",
    },
    {
      id: "high-5",
      title: "Transparency",
      description: "Design systems to be transparent, ensuring users understand capabilities and limitations.",
    },
    {
      id: "high-6",
      title: "Human Oversight",
      description: "Implement appropriate human oversight measures to minimize risk.",
    },
    {
      id: "high-7",
      title: "Accuracy & Robustness",
      description: "Ensure appropriate levels of accuracy, robustness, and cybersecurity.",
    },
    {
      id: "high-8",
      title: "Conformity Assessment",
      description: "Conduct conformity assessment procedures before placing on the market or putting into service.",
    },
    {
      id: "high-9",
      title: "Registration",
      description: "Register the high-risk AI system in the EU database before placing it on the market.",
    },
  ]

  const limitedRiskSteps = [
    {
      id: "limited-1",
      title: "Transparency for AI-Human Interactions",
      description:
        "Ensure humans are informed they are interacting with an AI system, unless this is obvious from the circumstances.",
    },
    {
      id: "limited-2",
      title: "Transparency for Emotion Recognition",
      description: "Inform people when they are subject to emotion recognition or categorization systems.",
    },
    {
      id: "limited-3",
      title: "Transparency for Deep Fakes",
      description: "Clearly disclose that content has been artificially generated or manipulated (deep fakes).",
    },
    {
      id: "limited-4",
      title: "Documentation",
      description: "Maintain documentation that demonstrates how transparency requirements are met.",
    },
    {
      id: "limited-5",
      title: "User Interface Design",
      description: "Design user interfaces to clearly communicate when AI is being used and its limitations.",
    },
  ]

  const minimalRiskSteps = [
    {
      id: "minimal-1",
      title: "Voluntary Codes of Conduct",
      description: "Consider adhering to voluntary codes of conduct for minimal-risk AI systems.",
    },
    {
      id: "minimal-2",
      title: "Documentation",
      description: "Maintain basic documentation about the AI system's purpose and functionality.",
    },
    {
      id: "minimal-3",
      title: "Best Practices",
      description: "Follow industry best practices for AI development and deployment.",
    },
    {
      id: "minimal-4",
      title: "Ethical Considerations",
      description: "Consider ethical implications of AI systems even when not legally required.",
    },
  ]

  const timelineSteps = [
    {
      id: "timeline-1",
      date: "May 2024",
      title: "Entry into Force",
      description: "The AI Act officially becomes law 20 days after publication in the Official Journal.",
    },
    {
      id: "timeline-2",
      date: "August 2024",
      title: "Prohibited AI Systems",
      description: "Provisions related to prohibited AI practices come into effect.",
    },
    {
      id: "timeline-3",
      date: "May 2025",
      title: "Governance Bodies",
      description: "AI Office and AI Board are established.",
    },
    {
      id: "timeline-4",
      date: "May 2026",
      title: "GPAI Provisions",
      description: "Provisions for general-purpose AI models come into effect.",
    },
    {
      id: "timeline-5",
      date: "May 2027",
      title: "Full Implementation",
      description: "All remaining provisions of the AI Act are in full effect.",
    },
  ]

  const faqs = [
    {
      question: "How do I determine if my AI system is high-risk?",
      answer:
        "High-risk AI systems are those used in products covered by EU harmonization legislation listed in Annex I, or those falling into categories listed in Annex III, such as education, employment, essential services, and law enforcement. Conduct a thorough assessment of your AI system's purpose, use case, and potential impact to determine its risk category.",
    },
    {
      question: "What documentation is required for high-risk AI systems?",
      answer:
        "High-risk AI systems require comprehensive technical documentation including: system description and purpose, design specifications, risk assessment methodology, data requirements, human oversight measures, validation and testing procedures, and details on monitoring and updating. This documentation must be kept up-to-date and available to national authorities upon request.",
    },
    {
      question: "Are there exemptions for research and development?",
      answer:
        "Yes, the AI Act includes exemptions for research, testing, and development activities before AI systems are placed on the market or put into service. However, these exemptions do not apply to high-risk AI systems used in safety components or systems that may harm people's health, safety, or fundamental rights.",
    },
    {
      question: "What are the penalties for non-compliance?",
      answer:
        "Penalties vary based on the violation and company size. For prohibited AI practices: up to €35 million or 7% of global annual turnover. For non-compliance with data governance requirements: up to €15 million or 3% of turnover. For providing incorrect information: up to €7.5 million or 1% of turnover.",
    },
    {
      question: "How often should risk assessments be updated?",
      answer:
        "Risk assessments for high-risk AI systems should be continuously updated throughout the system's lifecycle. At minimum, reassess when making significant changes to the system, when encountering new risks, and when monitoring reveals issues. Regular reviews are recommended at least annually or more frequently for rapidly evolving systems.",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Guide
          </Link>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">EU AI Act Implementation Guide</h1>
          <Button onClick={downloadAsExcel} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Download as Excel
          </Button>
        </div>

        <p className="text-slate-600 mb-8 max-w-3xl">
          This guide provides practical steps for implementing EU AI Act requirements based on your AI system's risk
          category. Use this resource to develop your compliance roadmap and download it as an Excel file for your team.
        </p>

        <Tabs defaultValue="high-risk" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="high-risk">High-Risk AI</TabsTrigger>
            <TabsTrigger value="limited-risk">Limited-Risk AI</TabsTrigger>
            <TabsTrigger value="minimal-risk">Minimal-Risk AI</TabsTrigger>
          </TabsList>

          <TabsContent value="high-risk">
            <Card>
              <CardHeader className="bg-amber-50">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-amber-600" />
                  <CardTitle className="text-amber-700">High-Risk AI Implementation</CardTitle>
                </div>
                <CardDescription>Comprehensive requirements for high-risk AI systems</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-1/3">
                    <div className="bg-amber-50 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-amber-800 mb-2">Key Consideration</h3>
                      <p className="text-slate-700">
                        High-risk AI systems require the most comprehensive compliance measures. Start implementation
                        early to ensure full compliance by the deadline.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-slate-700 mb-4">
                      High-risk AI systems are those used in critical infrastructure, education, employment, essential
                      services, law enforcement, migration management, and other areas with significant potential impact
                      on health, safety, or fundamental rights.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  {highRiskSteps.map((step, index) => (
                    <div key={step.id} className="border border-amber-100 rounded-lg p-4 bg-white">
                      <div className="flex items-start gap-3">
                        <div className="bg-amber-100 text-amber-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{step.title}</h3>
                          <p className="text-slate-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mt-8">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800">Implementation Tip</h3>
                      <p className="text-slate-700 mt-1">
                        Consider appointing a dedicated AI compliance officer to oversee the implementation of these
                        requirements for high-risk AI systems.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="limited-risk">
            <Card>
              <CardHeader className="bg-blue-50">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-blue-700">Limited-Risk AI Implementation</CardTitle>
                </div>
                <CardDescription>Transparency requirements for limited-risk AI systems</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-1/3">
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-blue-800 mb-2">Key Consideration</h3>
                      <p className="text-slate-700">
                        Limited-risk AI systems must meet transparency requirements to ensure users are aware they are
                        interacting with AI.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-slate-700 mb-4">
                      Limited-risk AI systems include chatbots, emotion recognition systems, and AI systems that
                      generate or manipulate content (deep fakes). These systems must meet specific transparency
                      obligations.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  {limitedRiskSteps.map((step, index) => (
                    <div key={step.id} className="border border-blue-100 rounded-lg p-4 bg-white">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 text-blue-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{step.title}</h3>
                          <p className="text-slate-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mt-8">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800">Implementation Tip</h3>
                      <p className="text-slate-700 mt-1">
                        Design clear, user-friendly notifications about AI use that don't disrupt the user experience
                        while still providing necessary transparency.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="minimal-risk">
            <Card>
              <CardHeader className="bg-green-50">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-700">Minimal-Risk AI Implementation</CardTitle>
                </div>
                <CardDescription>Voluntary measures for minimal-risk AI systems</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-1/3">
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <h3 className="font-semibold text-green-800 mb-2">Key Consideration</h3>
                      <p className="text-slate-700">
                        While minimal-risk AI systems have no mandatory requirements, voluntary compliance with codes of
                        conduct is encouraged.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-slate-700 mb-4">
                      Most AI systems fall into the minimal-risk category. These include AI-enabled video games, spam
                      filters, inventory management systems, and many other applications with minimal impact on safety
                      or fundamental rights.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mt-6">
                  {minimalRiskSteps.map((step, index) => (
                    <div key={step.id} className="border border-green-100 rounded-lg p-4 bg-white">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 text-green-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{step.title}</h3>
                          <p className="text-slate-600 mt-1">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mt-8">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-800">Implementation Tip</h3>
                      <p className="text-slate-700 mt-1">
                        Even for minimal-risk AI systems, implementing basic documentation and ethical practices can
                        prepare your organization for future regulatory changes and build trust with users.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Implementation Timeline</h2>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="relative pl-8 border-l-2 border-blue-200">
              {timelineSteps.map((step, index) => (
                <div key={step.id} className="mb-8 relative">
                  <div
                    className={`absolute -left-[25px] w-12 h-12 rounded-full bg-blue-100 border-blue-500 text-blue-700 border-4 flex items-center justify-center shadow-md mr-4 mt-2`}
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="pl-8">
                    <p className="font-bold text-blue-700 text-lg">{step.date}</p>
                    <h3 className="font-medium text-slate-900 text-xl mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="bg-white rounded-xl shadow-sm">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 hover:no-underline hover:bg-slate-50">
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-slate-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
