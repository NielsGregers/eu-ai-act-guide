"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, FileCheck, AlertTriangle, Shield, CheckCircle } from "lucide-react"
import * as XLSX from "xlsx"

export default function ComplianceChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const downloadAsExcel = () => {
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()

    // Prepare data for each category
    const preparationData = preparationItems.map((item) => [
      item.title,
      checkedItems[item.id] ? "✓" : "",
      item.description,
    ])

    const assessmentData = assessmentItems.map((item) => [
      item.title,
      checkedItems[item.id] ? "✓" : "",
      item.description,
    ])

    const implementationData = implementationItems.map((item) => [
      item.title,
      checkedItems[item.id] ? "✓" : "",
      item.description,
    ])

    const monitoringData = monitoringItems.map((item) => [
      item.title,
      checkedItems[item.id] ? "✓" : "",
      item.description,
    ])

    // Add headers
    preparationData.unshift(["Task", "Completed", "Description"])
    assessmentData.unshift(["Task", "Completed", "Description"])
    implementationData.unshift(["Task", "Completed", "Description"])
    monitoringData.unshift(["Task", "Completed", "Description"])

    // Create worksheets
    const wsPreparation = XLSX.utils.aoa_to_sheet(preparationData)
    const wsAssessment = XLSX.utils.aoa_to_sheet(assessmentData)
    const wsImplementation = XLSX.utils.aoa_to_sheet(implementationData)
    const wsMonitoring = XLSX.utils.aoa_to_sheet(monitoringData)

    // Apply styles to worksheets
    applyStyles(wsPreparation, preparationData.length, "blue")
    applyStyles(wsAssessment, assessmentData.length, "amber")
    applyStyles(wsImplementation, implementationData.length, "green")
    applyStyles(wsMonitoring, monitoringData.length, "purple")

    // Add worksheets to workbook
    XLSX.utils.book_append_sheet(wb, wsPreparation, "Preparation")
    XLSX.utils.book_append_sheet(wb, wsAssessment, "Risk Assessment")
    XLSX.utils.book_append_sheet(wb, wsImplementation, "Implementation")
    XLSX.utils.book_append_sheet(wb, wsMonitoring, "Monitoring")

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
    a.download = "EU_AI_Act_Compliance_Checklist.xlsx"
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

    // Set column widths
    const colWidths = [{ wch: 40 }, { wch: 15 }, { wch: 60 }]
    worksheet["!cols"] = colWidths

    // Get the range of the worksheet
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1:C1")

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

        // Center alignment for the "Completed" column
        if (col === 1) {
          worksheet[cellRef].s.alignment = {
            horizontal: "center",
            vertical: "center",
          }
        }
      }
    }
  }

  const preparationItems = [
    {
      id: "prep-1",
      title: "Identify AI systems in your organization",
      description: "Create an inventory of all AI systems used or developed by your organization",
    },
    {
      id: "prep-2",
      title: "Establish compliance team",
      description: "Form a cross-functional team responsible for AI Act compliance",
    },
    {
      id: "prep-3",
      title: "Review EU AI Act requirements",
      description: "Ensure key stakeholders understand the requirements of the EU AI Act",
    },
    {
      id: "prep-4",
      title: "Develop compliance roadmap",
      description: "Create a timeline for achieving compliance before relevant deadlines",
    },
    {
      id: "prep-5",
      title: "Allocate resources",
      description: "Ensure sufficient budget and resources are allocated for compliance activities",
    },
  ]

  const assessmentItems = [
    {
      id: "assess-1",
      title: "Determine risk category",
      description:
        "Assess each AI system to determine if it falls under prohibited, high-risk, limited-risk, or minimal-risk categories",
    },
    {
      id: "assess-2",
      title: "Identify applicable requirements",
      description: "Based on risk category, identify specific requirements applicable to each AI system",
    },
    {
      id: "assess-3",
      title: "Conduct gap analysis",
      description: "Compare current practices against EU AI Act requirements to identify gaps",
    },
    {
      id: "assess-4",
      title: "Assess data governance",
      description: "Review data collection, processing, and management practices for compliance",
    },
    {
      id: "assess-5",
      title: "Evaluate transparency measures",
      description: "Assess current transparency practices against requirements",
    },
    {
      id: "assess-6",
      title: "Review human oversight mechanisms",
      description: "Evaluate existing human oversight mechanisms for high-risk AI systems",
    },
  ]

  const implementationItems = [
    {
      id: "impl-1",
      title: "Implement risk management system",
      description: "Establish a risk management system for high-risk AI systems",
    },
    {
      id: "impl-2",
      title: "Enhance data governance",
      description: "Implement data quality and governance measures for training, validation, and testing datasets",
    },
    {
      id: "impl-3",
      title: "Prepare technical documentation",
      description: "Create comprehensive technical documentation for high-risk AI systems",
    },
    {
      id: "impl-4",
      title: "Implement logging capabilities",
      description: "Ensure automatic recording of events while high-risk AI systems are operating",
    },
    {
      id: "impl-5",
      title: "Enhance transparency",
      description: "Implement required transparency measures based on risk category",
    },
    {
      id: "impl-6",
      title: "Establish human oversight",
      description: "Implement appropriate human oversight measures for high-risk AI systems",
    },
    {
      id: "impl-7",
      title: "Ensure accuracy and robustness",
      description: "Implement measures to ensure accuracy, robustness, and cybersecurity",
    },
  ]

  const monitoringItems = [
    {
      id: "monitor-1",
      title: "Establish post-market monitoring",
      description: "Implement a post-market monitoring system for high-risk AI systems",
    },
    {
      id: "monitor-2",
      title: "Conduct conformity assessment",
      description: "Complete required conformity assessment procedures for high-risk AI systems",
    },
    {
      id: "monitor-3",
      title: "Register in EU database",
      description: "Register high-risk AI systems in the EU database before placing on market",
    },
    {
      id: "monitor-4",
      title: "Affix CE marking",
      description: "Affix CE marking to high-risk AI systems that have passed conformity assessment",
    },
    {
      id: "monitor-5",
      title: "Implement incident reporting",
      description: "Establish procedures for reporting serious incidents and malfunctions",
    },
    {
      id: "monitor-6",
      title: "Regular compliance reviews",
      description: "Schedule regular reviews to ensure ongoing compliance",
    },
  ]

  const renderChecklistItems = (items: typeof preparationItems) => (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-slate-50">
          <Checkbox
            id={item.id}
            checked={checkedItems[item.id] || false}
            onCheckedChange={() => toggleItem(item.id)}
            className="mt-1"
          />
          <div>
            <label htmlFor={item.id} className="font-medium text-slate-900 cursor-pointer">
              {item.title}
            </label>
            <p className="text-sm text-slate-600 mt-1">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )

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
          <h1 className="text-3xl font-bold text-slate-900">EU AI Act Compliance Checklist</h1>
          <Button onClick={downloadAsExcel} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Download as Excel
          </Button>
        </div>

        <p className="text-slate-600 mb-8 max-w-3xl">
          Use this interactive checklist to track your organization's progress toward EU AI Act compliance. Check off
          items as you complete them and download the checklist as an Excel file to share with your team.
        </p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="bg-red-50 border-red-100">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
              <p className="text-center font-medium text-red-800">Prohibited AI</p>
              <p className="text-xs text-center text-red-700">Ensure no prohibited AI systems are in use</p>
            </CardContent>
          </Card>
          <Card className="bg-amber-50 border-amber-100">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <Shield className="h-8 w-8 text-amber-600 mb-2" />
              <p className="text-center font-medium text-amber-800">High-Risk AI</p>
              <p className="text-xs text-center text-amber-700">Strict compliance requirements</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <FileCheck className="h-8 w-8 text-blue-600 mb-2" />
              <p className="text-center font-medium text-blue-800">Limited-Risk AI</p>
              <p className="text-xs text-center text-blue-700">Transparency obligations</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
              <p className="text-center font-medium text-green-800">Minimal-Risk AI</p>
              <p className="text-xs text-center text-green-700">Voluntary compliance</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="preparation" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="preparation">Preparation</TabsTrigger>
            <TabsTrigger value="assessment">Risk Assessment</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="preparation">
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle>Preparation Phase</CardTitle>
                <CardDescription>Initial steps to prepare for EU AI Act compliance</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">{renderChecklistItems(preparationItems)}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessment">
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle>Risk Assessment Phase</CardTitle>
                <CardDescription>Evaluate your AI systems against EU AI Act requirements</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">{renderChecklistItems(assessmentItems)}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation">
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle>Implementation Phase</CardTitle>
                <CardDescription>Implement necessary measures to achieve compliance</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">{renderChecklistItems(implementationItems)}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring">
            <Card>
              <CardHeader className="bg-blue-50">
                <CardTitle>Monitoring & Maintenance Phase</CardTitle>
                <CardDescription>Ensure ongoing compliance with the EU AI Act</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">{renderChecklistItems(monitoringItems)}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-slate-900">Compliance Timeline</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <h3 className="font-medium text-slate-900">May 2024</h3>
                <p className="text-slate-600">Entry into force - Begin compliance preparations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <h3 className="font-medium text-slate-900">August 2024</h3>
                <p className="text-slate-600">Prohibited AI systems provisions apply</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h3 className="font-medium text-slate-900">May 2025</h3>
                <p className="text-slate-600">Governance bodies established</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-green-100 text-green-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                4
              </div>
              <div>
                <h3 className="font-medium text-slate-900">May 2027</h3>
                <p className="text-slate-600">Full implementation - All provisions in effect</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
