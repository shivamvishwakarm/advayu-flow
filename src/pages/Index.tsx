import BrandOnboarding from "@/components/onboarding/BrandOnboarding";
import Content from "@/components/Content";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#A1F6FF] to-[#189EAC]/80">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:sticky lg:top-8">
            <Content />
          </div>
          <div className="animate-fade-in">
            <BrandOnboarding />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
