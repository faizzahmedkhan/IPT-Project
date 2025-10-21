import Navbar from "@/components/Navbar";
import Courses from "@/components/Courses";
import Footer from "@/components/Footer";

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Courses />
      <Footer />
    </div>
  );
};

export default CoursesPage;
