import Hero from "@/components/Hero";
import ModelInterface from "@/components/ModelInterface";
import ProjectDetails from "@/components/ProjectDetails";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f2e4a] via-[#071627] to-[#050f1a]">
      <Hero />
      <ModelInterface />
      <ProjectDetails />
      <Team />
      <Footer />
    </main>
  );
}
