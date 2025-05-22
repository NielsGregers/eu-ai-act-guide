"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, FileText, Clock, Shield, BookOpen, Scale, FileCheck, X } from "lucide-react"

export default function Home() {
  const [showCookieConsent, setShowCookieConsent] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem("cookieConsent")
    if (!hasConsented) {
      setShowCookieConsent(true)
    }
  }, [])

  const handleCookieConsent = (consent: boolean) => {
    localStorage.setItem("cookieConsent", consent ? "accepted" : "declined")
    setShowCookieConsent(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/abstract-digital-network.png')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">EU AI Act Guide</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              A comprehensive guide to understanding Europe's first regulatory framework for artificial intelligence
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-blue-700 hover:bg-blue-50">Download Guide</Button>
              <Button variant="outline" className="bg-green-600 text-white border-green-500 hover:bg-green-700">
                Explore Timeline
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white clip-path-wave"></div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">EU AI Act Timeline</h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            The journey from proposal to implementation spans several years, with different provisions coming into
            effect at various stages.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="mb-6">
                <a
                  href="https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ%3AL_202401689"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg border border-green-200 hover:bg-green-100 transition-colors font-medium"
                >
                  <FileText className="h-5 w-5" />
                  View Official EU AI Act (PDF)
                </a>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Key Takeaway</h3>
                <p className="text-slate-700">
                  Companies developing or using AI systems in the EU should begin preparing for compliance now,
                  especially those working with systems that may fall into the high-risk categories.
                </p>
              </div>
            </div>

            <div className="md:w-2/3">
              {/* Vertical Timeline with Green Theme */}
              <div className="relative pl-8 border-l-2 border-green-200">
                {/* Timeline points */}
                {[
                  {
                    date: "April 2021",
                    title: "Initial Proposal",
                    desc: "European Commission proposes the AI Act",
                    colorClasses: "bg-green-100 border-green-500 text-green-700",
                  },
                  {
                    date: "December 2023",
                    title: "Political Agreement",
                    desc: "Trilogue negotiations conclude with agreement between European Parliament, Council, and Commission",
                    colorClasses: "bg-green-100 border-green-600 text-green-700",
                  },
                  {
                    date: "March 2024",
                    title: "Formal Adoption",
                    desc: "Final text approved by European Parliament and Council",
                    colorClasses: "bg-green-100 border-green-500 text-green-700",
                  },
                  {
                    date: "May 2024",
                    title: "Entry into Force",
                    desc: "AI Act officially becomes law 20 days after publication in the Official Journal",
                    colorClasses: "bg-green-100 border-green-600 text-green-700",
                  },
                  {
                    date: "August 2024",
                    title: "General Provisions",
                    desc: "First set of rules begin to apply, including prohibited AI systems",
                    colorClasses: "bg-green-100 border-green-500 text-green-700",
                  },
                  {
                    date: "May 2027",
                    title: "Full Implementation",
                    desc: "All provisions of the AI Act are in full effect",
                    colorClasses: "bg-green-100 border-green-600 text-green-700",
                  },
                ].map((point, index) => (
                  <div key={index} className="mb-12 relative">
                    {/* Timeline bullet */}
                    <div
                      className={`absolute -left-[25px] w-12 h-12 rounded-full ${point.colorClasses} border-4 flex items-center justify-center shadow-md`}
                    >
                      <Clock className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="pl-4">
                      <p className="font-bold text-green-700 text-lg">{point.date}</p>
                      <h3 className="font-medium text-slate-900 text-xl mb-2">{point.title}</h3>
                      <p className="text-slate-600">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Categories Section */}
      <section className="py-16 container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Risk-Based Approach</h2>
        <p className="text-center text-slate-700 mb-12 max-w-3xl mx-auto">
          The EU AI Act categorizes AI systems based on their potential risk level, with different requirements for each
          category.
        </p>

        <Tabs defaultValue="prohibited" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="prohibited">Prohibited</TabsTrigger>
            <TabsTrigger value="high-risk">High-Risk</TabsTrigger>
            <TabsTrigger value="limited-risk">Limited Risk</TabsTrigger>
            <TabsTrigger value="minimal-risk">Minimal Risk</TabsTrigger>
          </TabsList>

          <TabsContent value="prohibited" className="space-y-6">
            <Card>
              <CardHeader className="bg-red-50">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <CardTitle className="text-red-700">Prohibited AI Systems</CardTitle>
                </div>
                <CardDescription>AI applications that are banned under the EU AI Act</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="bg-red-50 p-4 rounded-lg mb-4 h-40 flex items-center justify-center">
                      <Image
                        src="/social-scoring-system.png"
                        alt="Social Scoring Systems"
                        width={200}
                        height={150}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="bg-red-100 text-red-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          1
                        </span>
                        <div>
                          <h3 className="font-medium text-slate-900">Social Scoring Systems</h3>
                          <p className="text-slate-600">
                            Systems that evaluate or classify individuals based on social behavior or personal
                            characteristics
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-red-100 text-red-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          2
                        </span>
                        <div>
                          <h3 className="font-medium text-slate-900">Biometric Identification in Public Spaces</h3>
                          <p className="text-slate-600">
                            Real-time remote biometric identification systems in publicly accessible spaces for law
                            enforcement (with limited exceptions)
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-red-100 text-red-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          3
                        </span>
                        <div>
                          <h3 className="font-medium text-slate-900">Emotion Recognition in Workplaces and Schools</h3>
                          <p className="text-slate-600">
                            Systems that categorize people based on emotions or personal traits in educational or
                            workplace settings
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-red-100 text-red-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          4
                        </span>
                        <div>
                          <h3 className="font-medium text-slate-900">Predictive Policing</h3>
                          <p className="text-slate-600">
                            AI systems that predict the likelihood of a natural person committing a crime based solely
                            on profiling
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="high-risk" className="space-y-6">
            <Card>
              <CardHeader className="bg-amber-50">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                  <CardTitle className="text-amber-700">High-Risk AI Systems</CardTitle>
                </div>
                <CardDescription>AI applications subject to strict regulatory requirements</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-1/3">
                    <div className="bg-amber-50 p-4 rounded-lg h-40 flex items-center justify-center">
                      <Image
                        src="/high-risk-ai-diagram.png"
                        alt="High-Risk AI Systems"
                        width={200}
                        height={150}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-slate-700 mb-4">
                      High-risk AI systems are subject to strict requirements before they can be put on the market.
                      These systems must comply with specific obligations related to data quality, documentation,
                      transparency, human oversight, and more.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Categories</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">Critical infrastructure management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">Educational and vocational training</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">Employment and worker management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">Access to essential services</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">Law enforcement applications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">Migration, asylum, and border control</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900">Requirements</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">Risk assessment and mitigation systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">High quality of datasets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">Detailed documentation and record-keeping</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">Transparency and information to users</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">Human oversight</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-amber-100 text-amber-700 rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs">
                          •
                        </span>
                        <span className="text-slate-700">Robustness, accuracy, and cybersecurity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="limited-risk" className="space-y-6">
            <Card>
              <CardHeader className="bg-blue-50">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-blue-700">Limited Risk AI Systems</CardTitle>
                </div>
                <CardDescription>AI applications with specific transparency obligations</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-1/3">
                    <div className="bg-blue-50 p-4 rounded-lg h-40 flex items-center justify-center">
                      <Image
                        src="/ai-chatbot-transparency.png"
                        alt="Limited Risk AI Systems"
                        width={200}
                        height={150}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-slate-700">
                      Limited risk AI systems are subject to specific transparency requirements. Users must be made
                      aware when they are interacting with AI systems so they can make informed decisions.
                    </p>
                  </div>
                </div>

                <h3 className="font-semibold text-slate-900 mb-4">Examples include:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <h4 className="font-medium text-slate-900">Chatbots</h4>
                      <p className="text-slate-600">Users must be informed they are interacting with an AI system</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <h4 className="font-medium text-slate-900">Emotion Recognition Systems</h4>
                      <p className="text-slate-600">
                        Users must be informed when subject to emotion recognition (outside prohibited contexts)
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <h4 className="font-medium text-slate-900">Deepfakes</h4>
                      <p className="text-slate-600">
                        AI-generated or manipulated image, audio or video content must be labeled as artificially
                        generated
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="minimal-risk" className="space-y-6">
            <Card>
              <CardHeader className="bg-green-50">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <CardTitle className="text-green-700">Minimal Risk AI Systems</CardTitle>
                </div>
                <CardDescription>AI applications with minimal regulatory requirements</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-1/3">
                    <div className="bg-green-50 p-4 rounded-lg h-40 flex items-center justify-center">
                      <Image
                        src="/minimal-risk-ai.png"
                        alt="Minimal Risk AI Systems"
                        width={200}
                        height={150}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-slate-700">
                      The vast majority of AI systems fall into the minimal risk category. These systems are subject to
                      very light regulation, with the Act encouraging voluntary codes of conduct.
                    </p>
                  </div>
                </div>

                <h3 className="font-semibold text-slate-900 mb-4">Examples include:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">AI-enabled video games</h4>
                    <p className="text-sm text-slate-600">Games using AI for character behavior and interactions</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Spam filters</h4>
                    <p className="text-sm text-slate-600">Basic AI systems that filter unwanted emails</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">AI-powered recommendation systems</h4>
                    <p className="text-sm text-slate-600">Systems suggesting products or content (with exceptions)</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Basic AI research applications</h4>
                    <p className="text-sm text-slate-600">Non-critical research and development AI systems</p>
                  </div>
                </div>

                <div className="bg-green-100 p-4 rounded-lg mt-6">
                  <h3 className="font-medium text-green-800 mb-2">Voluntary Codes of Conduct</h3>
                  <p className="text-green-700">
                    The EU AI Act encourages developers of minimal-risk AI systems to adhere to voluntary codes of
                    conduct, promoting responsible AI development even for low-risk applications.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Visual Risk Matrix */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-900">AI Risk Matrix</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <div className="bg-red-100 p-4 rounded-lg text-center">
              <div className="bg-red-200 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-700" />
              </div>
              <h3 className="font-bold text-red-800 mb-1">Prohibited</h3>
              <p className="text-xs md:text-sm text-red-700">Banned AI applications</p>
            </div>

            <div className="bg-amber-100 p-4 rounded-lg text-center">
              <div className="bg-amber-200 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Shield className="h-8 w-8 text-amber-700" />
              </div>
              <h3 className="font-bold text-amber-800 mb-1">High Risk</h3>
              <p className="text-xs md:text-sm text-amber-700">Strict compliance required</p>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <div className="bg-blue-200 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="font-bold text-blue-800 mb-1">Limited Risk</h3>
              <p className="text-xs md:text-sm text-blue-700">Transparency obligations</p>
            </div>

            <div className="bg-green-100 p-4 rounded-lg text-center">
              <div className="bg-green-200 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="font-bold text-green-800 mb-1">Minimal Risk</h3>
              <p className="text-xs md:text-sm text-green-700">Voluntary compliance</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-slate-900 text-center">Risk Level vs. Regulatory Burden</h3>
            <div className="relative h-64 md:h-80">
              <div className="absolute inset-0">
                <div className="h-full w-full bg-gradient-to-r from-green-50 via-blue-50 to-red-50"></div>
                <div className="absolute inset-x-0 bottom-0 h-px bg-slate-300"></div>
                <div className="absolute inset-y-0 left-0 w-px bg-slate-300"></div>

                {/* X-axis label */}
                <div className="absolute bottom-0 left-0 right-0 text-center -mb-6">
                  <p className="text-sm font-medium text-slate-700">Risk Level</p>
                </div>

                {/* Y-axis label */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 transform">
                  <p className="text-sm font-medium text-slate-700">Regulatory Burden</p>
                </div>

                {/* Risk categories */}
                <div className="absolute left-[10%] bottom-[10%] transform translate-x-[-50%] translate-y-[50%]">
                  <div className="bg-green-100 rounded-full p-2 shadow-sm">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="absolute whitespace-nowrap text-xs font-medium mt-1 text-green-800">Minimal Risk</p>
                </div>

                <div className="absolute left-[40%] bottom-[30%] transform translate-x-[-50%] translate-y-[50%]">
                  <div className="bg-blue-100 rounded-full p-2 shadow-sm">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="absolute whitespace-nowrap text-xs font-medium mt-1 text-blue-800">Limited Risk</p>
                </div>

                <div className="absolute left-[70%] bottom-[60%] transform translate-x-[-50%] translate-y-[50%]">
                  <div className="bg-amber-100 rounded-full p-2 shadow-sm">
                    <Shield className="h-6 w-6 text-amber-600" />
                  </div>
                  <p className="absolute whitespace-nowrap text-xs font-medium mt-1 text-amber-800">High Risk</p>
                </div>

                <div className="absolute left-[90%] bottom-[90%] transform translate-x-[-50%] translate-y-[50%]">
                  <div className="bg-red-100 rounded-full p-2 shadow-sm">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <p className="absolute whitespace-nowrap text-xs font-medium mt-1 text-red-800">Prohibited</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-slate-900">Compliance Guide</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 h-32 bg-blue-50 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-blue-400" />
                </div>
                <ul className="space-y-2">
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Determine if your system is covered by the AI Act</span>
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Identify which risk category your AI system falls into</span>
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Review specific requirements applicable to your system</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  Implementation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 h-32 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Scale className="h-12 w-12 text-blue-400" />
                </div>
                <ul className="space-y-2">
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Establish risk management systems</span>
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Ensure data governance and management practices</span>
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Prepare technical documentation</span>
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Implement record-keeping capabilities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">
                    3
                  </span>
                  Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 h-32 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FileCheck className="h-12 w-12 text-blue-400" />
                </div>
                <ul className="space-y-2">
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Conduct conformity assessment</span>
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Register high-risk AI systems in EU database</span>
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Affix CE marking if applicable</span>
                  </li>
                  <li className="text-slate-700 flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Establish post-market monitoring system</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-slate-900">Penalties for Non-Compliance</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Violation Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Maximum Fine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Examples
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      Prohibited AI practices
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">
                      €35 million or 7% of global turnover
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">Using banned social scoring systems</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      Non-compliance with data governance
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600 font-semibold">
                      €15 million or 3% of global turnover
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      Using biased training data for high-risk systems
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      Providing incorrect information
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">
                      €7.5 million or 1% of global turnover
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">Misleading documentation or risk assessments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Prepare Your Organization for the EU AI Act</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Stay ahead of regulatory requirements and ensure your AI systems are compliant with the world's first
            comprehensive AI legislation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-blue-700 hover:bg-blue-50">Download Compliance Checklist</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">EU AI Act Guide</h3>
              <p className="text-sm">
                A comprehensive resource for understanding and complying with the European Union's Artificial
                Intelligence Act.
              </p>
              <div className="mt-6">
                <p className="text-xs text-slate-400 italic">
                  This content is purely AI-generated based on inspiration from dialogue at the meeting regarding EU AI
                  Act held May 22, 2025, with prompts curated by Niels Gregers Johansen.
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Official EU AI Act Text
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Compliance Toolkit
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Risk Assessment Template
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Implementation Guide
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Timeline
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Risk Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Compliance Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Penalties
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Stay Updated</h4>
              <p className="text-sm mb-4">Subscribe to receive updates on the EU AI Act implementation.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-slate-900 text-sm rounded-l-md focus:outline-none w-full"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Company Logos */}
          <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6 md:mb-0">
              <div className="flex items-center">
                <Image
                  src="/placeholder-cmc5a.png"
                  alt="Trifork Logo"
                  width={120}
                  height={40}
                  className="h-10 object-contain"
                />
              </div>
              <div className="flex items-center">
                <Image
                  src="/gorrissen-federspiel-logo.png"
                  alt="Gorrissen Federspiel Logo"
                  width={120}
                  height={40}
                  className="h-10 object-contain"
                />
              </div>
            </div>
            <div>
              <a
                href="https://magicbutton.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                magicbutton.cloud
              </a>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-center">
            <p>© 2024 EU AI Act Guide. This is a dummy guide for informational purposes only.</p>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white p-4 shadow-lg z-50">
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1">Cookie Consent</h3>
              <p className="text-sm text-slate-300">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
                traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-slate-700"
                onClick={() => handleCookieConsent(false)}
              >
                Decline
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleCookieConsent(true)}>
                Accept All
              </Button>
              <button
                className="text-slate-400 hover:text-white p-2"
                onClick={() => setShowCookieConsent(false)}
                aria-label="Close cookie consent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .clip-path-wave {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          border-radius: 0 0 50% 50% / 0 0 100% 100%;
          transform: translateY(1px);
        }
      `}</style>
    </div>
  )
}
