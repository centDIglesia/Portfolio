import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Briefcase } from "lucide-react";

export default function Resume() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Resume</h2>

      {/* Education */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-primary" size={24} />
          <h3 className="text-2xl font-semibold">Education</h3>
        </div>

        <div className="space-y-6">
          <TimelineItem
            title="University School of the Arts"
            period="2007 — 2008"
            description="Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur."
          />
          <TimelineItem
            title="New York Academy of Art"
            period="2006 — 2007"
            description="Ratione voluptatem sequi nesciunt, facere quisquams facere menda ossimus, omnis voluptas assumenda est omnis."
          />
          <TimelineItem
            title="High School of Art and Design"
            period="2002 — 2004"
            description="Duis aute irure dolor in reprehenderit in voluptate, quila voluptas mag odit aut fugit, sed consequuntur magni dolores eos."
          />
        </div>
      </div>

      {/* Experience */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="text-primary" size={24} />
          <h3 className="text-2xl font-semibold">Experience</h3>
        </div>

        <div className="space-y-6">
          <TimelineItem
            title="Creative Director"
            period="2015 — Present"
            description="Leo curl, orci ac commodo pellentesque, lacus nulla sed nunc, interdum congue tempor velit. Etiam pretium diam rhoncus libero."
          />
          <TimelineItem
            title="Art Director"
            period="2013 — 2015"
            description="Nemo enim ipsam voluptatem blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur."
          />
          <TimelineItem
            title="Web Designer"
            period="2010 — 2013"
            description="Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti, quos dolores et quas molestias exceptur."
          />
        </div>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">My Skills</h3>

        <div className="space-y-6">
          <SkillCard skill="Web Design" percentage={80} />
          <SkillCard skill="Graphic Design" percentage={70} />
          <SkillCard skill="Branding" percentage={90} />
          <SkillCard skill="WordPress" percentage={50} />
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ title, period, description }: any) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary" />
      <CardHeader className="pl-6">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Badge variant="outline" className="w-fit border-primary text-primary">
          {period}
        </Badge>
      </CardHeader>
      <CardContent className="pl-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function SkillCard({ skill, percentage }: any) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between mb-3">
          <span className="font-medium">{skill}</span>
          <span className="text-primary font-semibold">{percentage}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
