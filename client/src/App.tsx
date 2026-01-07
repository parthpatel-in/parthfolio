import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, User, Briefcase, Mail, Github, Download, ExternalLink, Code, Layers, Smartphone, Globe, ArrowUp , Linkedin , } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


// import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
// import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
// import { api } from "@shared/routes";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";


// Navigation Component
function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const navItems = [
    { href: "home", icon: HomeIcon, label: "Home" },
    { href: "about", icon: User, label: "About" },
    { href: "services", icon: Layers, label: "Services" },
    { href: "projects", icon: Briefcase, label: "Projects" },
    { href: "contact", icon: Mail, label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.href));
      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-[1000] flex h-16 items-center justify-around border-t bg-background/80 backdrop-blur-md md:hidden">
        {navItems.map((item) => (
          <button
            key={item.href}
            onClick={() => scrollTo(item.href)}
            className={`flex flex-col items-center gap-1 transition-colors ${activeSection === item.href ? "text-primary" : "text-muted-foreground"}`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <header className="fixed top-0 left-0 right-0 z-[1000] hidden h-16 border-b bg-background/80 backdrop-blur-md md:block">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <button onClick={() => scrollTo("home")} className="text-2xl font-bold cursor-pointer">
            Parth <span className="text-primary">.</span>
          </button>
          <div className="flex items-center gap-6">
  {navItems.map((item) => (
    <a
      key={item.href}
      href={`#${item.href}`}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        activeSection === item.href
          ? "text-primary"
          : "text-muted-foreground"
      }`}
    >
      {item.label}
    </a>
  ))}

  <Button size="sm" variant="outline" className="gap-2" asChild>
    <a
      href="https://github.com/parthpatel-in"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Github className="h-4 w-4" /> Star on GitHub
    </a>
  </Button>
</div>

        </div>
      </header>
    </>
  );
}

// Section Wrapper
const Section = ({ id, children, className = "" }: { id: string, children: React.ReactNode, className?: string }) => (
  <section id={id} className={`min-h-screen flex flex-col justify-center py-20 md:py-32 ${className}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4"
    >
      {children}
    </motion.div>
  </section>
);

// Pages
const Home = () => (
  <Section id="home">
    <div className="flex flex-col gap-6">
      <span className="text-3xl">Hi 👋</span>
      <h3 className="text-4xl font-bold md:text-7xl">I am a,</h3>
     <div className="flex items-center gap-2">
  <p className="text-3xl font-bold text-primary md:text-6xl">
    <Typewriter
      words={["Parth-patel", "MERN developer",]}
      loop={true}
      cursor
      cursorColor="#895CF4"
      cursorBlinking={true}
      cursorStyle="|"
      typeSpeed={50}
      deleteSpeed={50}
      delaySpeed={2000}
    />
  </p>

  <span className="h-12 w-1 animate-pulse bg-primary md:h-16"></span>
</div>

      <p className="max-w-xl text-lg text-muted-foreground">
        Specializing in building exceptional digital experiences using modern technologies.
      </p>
      <div className="mt-4 flex gap-4">

        <Button asChild className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white font-semibold text-lg rounded-full hover:shadow-[0_0_25px] hover:shadow-violet-700 transition duration-300 ease-in-out">
          <a href="/Resume.pdf" download="Resume.pdf">
      resume <Download className="h-5 w-5" />
    </a>
         
        </Button>
      </div>

      <div className="mt-20">
        <h3 className="mb-8 text-2xl font-bold">My Technical Stack</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {["MongoDB", "Express", "React", "Node.js", "TypeScript",  "Tailwind CSS", "MySQL"].map((skill) => (
            <Card key={skill} className="flex items-center justify-center p-4 text-center hover-elevate">
              <span className="font-medium">{skill}</span>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const About = () => (
  <Section id="about">
    <div className="grid gap-12 md:grid-cols-2 items-center">
      <div>
        <h2 className="mb-6 text-4xl font-bold">About Me</h2>
        <div className="prose prose-invert max-w-none text-muted-foreground">
          <p className="text-lg leading-relaxed mb-4">
            I'm a passionate Full Stack Developer with a strong focus on building modern, scalable web applications. I love turning complex problems into simple, beautiful, and intuitive designs.
          </p>
          {/* <p className="text-lg leading-relaxed">
            With over 5 years of experience, I've worked across the entire stack to deliver high-quality products that meet both user needs and business goals.
          </p> */}
        </div>
        <div className="mt-8 flex gap-4">
          {/* <Badge variant="secondary" className="px-3 py-1">5+ Years Experience</Badge> */}
          <Badge variant="secondary" className="px-3 py-1">20+ Projects Completed</Badge>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl"></div>
          <Avatar className="h-64 w-64 border-4 border-primary/50 shadow-2xl md:h-80 md:w-80">
            <AvatarImage src="/p1.webp"  alt="Parth Patel Full Stack MERN Developer"/>
            <AvatarFallback>parth</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  </Section>
);

const Services = () => {
  const services = [
    {
      title: "Frontend Development",
      description: "Building responsive, performant, and accessible web interfaces using React and modern CSS.",
      icon: Code,
    },
    {
      title: "Backend Development",
      description: "Crafting scalable server-side logic, APIs, and database architectures with Node.js.",
      icon: Layers,
    },
    {
      title: "Graphic Designing & Printing  ",
      description: "Designing cohesive visual branding and delivering professional-grade printed marketing materials.",
      icon: Smartphone,
    },
    {
      title: "Full Stack Solutions",
      description: "End-to-end web application development from concept to deployment.",
      icon: Globe,
    },
  ];

  return (
    <Section id="services">
      <h2 className="mb-12 text-4xl font-bold">Services</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {services.map((s, i) => (
          <Card key={s.title} className="h-full border-none bg-card/50 backdrop-blur-sm transition-all hover:bg-card">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <CardTitle>{s.title}</CardTitle>
              <CardDescription className="text-base text-muted-foreground">{s.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Helping Hands",
      desc: "A comprehensive home-management ecosystem connecting homeowners with verified professionals for on-demand maintenance, repairs, and installations.",
      tags: ["PHP", "JavaScript", "MySql"],
      img: "/HelpingHands.webp",
      github: "https://github.com/parthpatel-in/helping-hands", 
    demo: "https://helping-hands-demo.com"
    },
    {
      title: "Mega Blog",
      desc: "A production-grade blogging ecosystem featuring dynamic content management, real-time state synchronization, and a fully responsive rich-text editor.",
      tags: ["React", "Tailwind","Appwrite","Tinymce"],
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      github: "https://github.com/parthpatel-in/REACT-PROJECT/tree/main/MegaBlog",
    demo: "https://helping-hands-demo.com"
    },
    {
      title: "Weather App",
      desc: "a real-time atmospheric data platform utilizing asynchronous Fetch API integrations to deliver hyper-local environmental metrics, including wind ,humidity levels through an  low-latency dashboard ",
      tags: ["React", "Tailwind", "GithubApi"],
      img: "/weather.webp",
      github: "https://github.com/yourusername/WeatherApp", 
    demo: "https://helping-hands-demo.com"
    },
    {
      title: "Umiya Parivar Trust",
      desc: " A modern community website designed to digitally preserve and present cultural heritage, events, and temple activities through a fast, responsive web experience.",
      tags: ["React", "Express", "Tailwind","TypeScript"],
      img: "/umiyaTrust1.webp",
      github: "https://github.com/parthpatel-sketch/umiya-parivar", // Add this
     demo: "https://umiya-parivar-goz.vercel.app/"
    }
 
  ];

  return (
    <Section id="projects">
      <h2 className="mb-12 text-4xl font-bold">Featured Projects</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {projects.map((p) => (
          <Card key={p.title} className="overflow-hidden border-none bg-card/50 backdrop-blur-sm transition-transform hover:-translate-y-2">
            <img src={p.img} alt={p.title} className="h-48 w-full object-cover" />
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
              </div>
              <div className="mt-6 flex gap-4">
                <Button size="sm" variant="outline" className="gap-2" asChild>
                  <a href={p.github}><Github className="h-4 w-4" /> Code</a>
                </Button>
                <Button size="sm" className="gap-2" asChild>
                <a href={p.demo}><ExternalLink className="h-4 w-4" /> Live Demo</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
 const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });


 
    

  const onSubmit = async (values: FormValues) => {
    // 1. Google Form Response URL (Aapke Form ID ke saath)
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdRNVrXyevEtgLFlehUyy-gwiM0c_ytbr2lkPWKsa8AmItC3Q/formResponse";
    
    // 2. Updated Entry IDs (Jo aapne Network tab se nikale hain)
    const ENTRY_IDS = {
      name: "entry.2005620554",    
      email: "entry.1045781291",   
      message: "entry.839337160"  
    };

    const body = new FormData();
    body.append(ENTRY_IDS.name, values.name);
    body.append(ENTRY_IDS.email, values.email);
    body.append(ENTRY_IDS.message, values.message);

    try {
      // 'no-cors' use karna zaroori hai browser restrictions ke liye
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: body,
      });

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you! We have received your message.",
      });
      
      // Form ko reset karein taaki user fir se bhar sake
      form.reset();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "Could not submit data. Please check your connection.",
      });
    }
  };




  return (
    <Section id="contact">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-6 text-4xl font-bold text-center">Get In Touch</h2>
        <p className="mb-12 text-center text-muted-foreground">
          Have a project in mind or just want to say hi? Feel free to reach out and I'll get back to you as soon as possible.
        </p>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}
className="space-y-6">

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="How can i assist you??" className="min-h-[150px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full"  disabled={form.formState.isSubmitting}>
  
                  {form.formState.isSubmitting ? "Sending..." : "Send  Message"}
</Button>

              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t bg-card/50 backdrop-blur-md py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Parth <span className="text-primary">.</span></h3>
            <p className="text-muted-foreground text-lg max-w-sm leading-relaxed">
              Building modern, performant, and beautiful web applications with a focus on user experience and clean code.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-6">Quick Links</h4>
            <div className="flex flex-col gap-4">
              {["home", "about", "services", "projects", "contact"].map((item) => (
                <a
                  href={`#${item}`}
                  onClick={() => scrollTo(item)} 
                  className="text-left text-muted-foreground hover:text-primary capitalize transition-all hover:pl-1"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-6">Connect</h4>
            <div className="flex flex-col gap-4">
              <a 
                href="https://github.com/parthpatel-in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all hover:pl-1"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a 
                href="mailto:parthpatelinkedin@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all hover:pl-1"
              >
                <Mail className="h-5 w-5" />
                <span>Email</span>
                
              </a>
                <a 
                href="https://www.linkedin.com/in/parth-patel-832a7a238/"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all hover:pl-1"
              >
                 <Linkedin />
                {/* <linkedin className="h-5 w-5" /> */}
                <span>Linkedin</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Parth. Built with React & Tailwind.</p>
          <div className="flex gap-6">
            <button className="hover:text-primary transition-colors">Privacy Policy</button>
            <button className="hover:text-primary transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Helmet>
            <link rel="canonical" href="https://parthpatel-in.vercel.app" />
            <title>Parth | Full Stack Mern Developer Portfolio</title>
            <meta
    name="description"
    content="Parth Patel is a Full Stack MERN Developer specializing in React, Node.js, MongoDB."
  />
             {/* Canonical */}
  <link rel="canonical" href="https://parthpatel-in.vercel.app" />

  {/* Open Graph */}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Parth Patel | Full Stack MERN Developer" />
  <meta property="og:description" content="Full Stack MERN Developer Portfolio" />
  <meta property="og:image" content="https://parthpatel-in.vercel.app/og-image.webp" />
   <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og.name" content="parthpatel-in" />
  <meta property="og:url" content="https://parthpatel-in.vercel.app" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://parthpatel-in.vercel.app/og-image.webp" />
 <meta name="twitter:title" content="Parth Patel | Full Stack MERN Developer" />
<meta name="twitter:description" content="React | Node | MongoDB | Professional Portfolio" />
        
          </Helmet>
          
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-primary z-[2000] origin-left"
            style={{ scaleX }}
          />

          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main>
              <Home />
              <About />
              <Services />
              <Projects />
              <Contact />
            </main>
            <Footer />
            
            <AnimatePresence>
              {showScrollTop && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed bottom-20 right-4 z-[1000] md:bottom-8 md:right-8"
                >
                  <Button
                    size="icon"
                    className="rounded-full shadow-lg"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
