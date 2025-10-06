import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, User } from "lucide-react";

export function StudentProfile() {
  return (
    <Card className="sticky top-6">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-24 w-24 border-4 border-success">
            <AvatarImage src="/student-portrait.jpg" alt="Student" />
            <AvatarFallback className="text-2xl">JD</AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-bold text-balance">
              Josiah Davis Chimzuruoke
            </h2>
            <p className="text-sm text-muted-foreground mt-1">100 LEVEL</p>
            <p className="text-sm font-medium text-success mt-1">
              Computer Science
            </p>
          </div>

          <Button className="w-full bg-success hover:bg-success/90 text-success-foreground">
            <User className="h-4 w-4 mr-2" />
            Update Profile
          </Button>

          <div className="w-full pt-4 border-t space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Mobile Phone
                </p>
                <p className="font-medium">09018797128</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Email Address
                </p>
                <p className="font-medium break-all">
                  smartkelvin775@gmail.com
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Department
                </p>
                <p className="font-medium">School of Computing</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
