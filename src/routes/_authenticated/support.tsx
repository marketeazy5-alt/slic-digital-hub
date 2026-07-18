import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import {
  Phone, Mail, MessageCircle, HelpCircle, FileText, ChevronRight,
  Clock, MapPin, Plus, Minus, Search,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/support")({
  component: SupportPage,
});

const faqs = [
  { q: "How do I file a claim?", a: "Navigate to the Claims Hub from the sidebar, then click 'File new claim'. You'll need your policy number and supporting documents ready for upload." },
  { q: "What payment methods are accepted?", a: "We accept Raast, EasyPaisa, JazzCash, all major credit/debit cards, bank transfers, and auto-debit instructions." },
  { q: "How do I update my contact information?", a: "Go to Settings → Profile from the sidebar menu. You can update your phone number, address, and other contact details there." },
  { q: "Can I view my policy documents online?", a: "Yes. Navigate to Policies → select a policy → Documents tab to view and download all your policy documents." },
  { q: "How do I add or change a nominee?", a: "Nominee changes can be made from the policy detail view under the Nominees tab. This requires verification." },
  { q: "What is the grace period for premium payments?", a: "You have a 30-day grace period after the due date. During this time, your coverage continues uninterrupted." },
];

function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (f) => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppShell title="Support Center" subtitle="We're here to help.">
      <Tabs defaultValue="faq">
        <TabsList className="mb-6">
          <TabsTrigger value="faq" className="gap-2"><HelpCircle className="h-4 w-4" /> FAQ</TabsTrigger>
          <TabsTrigger value="ticket" className="gap-2"><FileText className="h-4 w-4" /> Submit ticket</TabsTrigger>
          <TabsTrigger value="contact" className="gap-2"><Phone className="h-4 w-4" /> Contact us</TabsTrigger>
        </TabsList>

        <TabsContent value="faq">
          <div className="space-y-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs..."
                className="pl-9"
              />
            </div>
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <div key={i} className="border border-border rounded-xl bg-card overflow-hidden transition-all duration-300">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-semibold">{faq.q}</span>
                    {openFaq === i ? <Minus className="h-5 w-5 text-muted-foreground shrink-0" /> : <Plus className="h-5 w-5 text-muted-foreground shrink-0" />}
                  </button>
                  <div className={`px-5 text-muted-foreground overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"}`}>
                    {faq.a}
                  </div>
                </div>
              ))}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-10 text-sm text-muted-foreground">
                  No FAQs match your search. Try different keywords or submit a ticket.
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ticket">
          <div className="max-w-2xl space-y-6">
            <div className="surface-elevated p-6">
              <h3 className="font-semibold font-display mb-4">Submit a support ticket</h3>
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Ticket submitted", { description: "We'll get back to you within 24 hours." });
                }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Subject</Label>
                    <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm">
                      <option>Payment issue</option>
                      <option>Claim question</option>
                      <option>Policy inquiry</option>
                      <option>Technical support</option>
                      <option>Account issue</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Priority</Label>
                    <select className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea rows={5} placeholder="Describe your issue in detail..." />
                </div>
                <div className="space-y-1.5">
                  <Label>Attachments (optional)</Label>
                  <FileUpload accept=".pdf,.jpg,.png,.doc,.docx" maxSizeMB={10} />
                </div>
                <Button type="submit" className="btn-magnetic">Submit ticket</Button>
              </form>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            <div className="surface-elevated p-6">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold font-display text-lg mb-2">Phone support</h3>
              <p className="text-sm text-muted-foreground mb-4">Speak directly with our support team during business hours.</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 0800-01234 (Toll-free)</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Mon–Fri, 9:00 AM – 6:00 PM</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Sat, 9:00 AM – 2:00 PM</div>
              </div>
            </div>

            <div className="surface-elevated p-6">
              <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-semibold font-display text-lg mb-2">Email & chat</h3>
              <p className="text-sm text-muted-foreground mb-4">Send us an email or use the live chat feature.</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> support@slicdigital.pk</div>
                <div className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-gold" /> Live chat (available 24/7)</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> 180+ branches nationwide</div>
              </div>
              <Button variant="outline" className="mt-4 w-full btn-magnetic">Start live chat</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
