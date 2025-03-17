import { Github, Linkedin, Mail, Twitter, Cpu, Zap, Award } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DeveloperProfileCard() {
  return (
    <div className="flex justify-center items-center min-h-[500px] p-4">
      <Card className="w-full max-w-lg overflow-hidden border-0 shadow-xl">
        <div className="h-28 bg-gradient-to-r from-gray-800 to-gray-600 relative">
          <div className="absolute -bottom-12 left-6">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src="/your-profile-image.jpg" alt="Israel Oluwasegun Kolawole" />
              <AvatarFallback className="text-2xl bg-gray-100">IK</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <CardHeader className="pt-14 pb-2">
          <h2 className="text-2xl font-bold">Israel Oluwasegun Kolawole</h2>
          <p className="text-muted-foreground flex items-center gap-1 text-sm">
            <Cpu className="h-4 w-4" /> Drone & Robotics Engineer | Full-Stack Developer
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Building autonomous drone systems, AI-powered applications, and scalable web solutions.
          </p>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Drone Systems</span>
              <span className="text-muted-foreground">Expert</span>
            </div>
            <Progress value={95} className="h-2" />

            <div className="flex justify-between text-sm">
              <span className="font-medium">Full-Stack Development</span>
              <span className="text-muted-foreground">Advanced</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary">Django</Badge>
            <Badge variant="secondary">Python</Badge>
            <Badge variant="secondary">ROS</Badge>
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Computer Vision</Badge>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Award className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">ALX AI & Data Analytics Bootcamp Graduate</span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              <Github className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
          <Button className="gap-2">
            <Mail className="h-4 w-4" />
            Contact
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
