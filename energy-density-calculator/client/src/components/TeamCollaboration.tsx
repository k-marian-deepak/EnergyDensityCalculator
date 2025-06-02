import { Share2, Download, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TeamCollaboration() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900">Team Collaboration</CardTitle>
            <CardDescription>Share your calculations with team members and clients</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2" size={14} />
              Share Link
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2" size={14} />
              Export PDF
            </Button>
            <Button size="sm">
              <MessageSquare className="mr-2" size={14} />
              Add Comment
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">12</div>
            <div className="text-sm text-slate-600">Calculations Today</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">3</div>
            <div className="text-sm text-slate-600">Team Members Active</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-secondary">7</div>
            <div className="text-sm text-slate-600">Reports Generated</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
