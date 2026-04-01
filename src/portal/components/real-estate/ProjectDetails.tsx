// components/project/ProjectDetails.tsx
import ProjectFeatures from "./ProjectFeatures";
const img = "/assets/Fish.png";

export default function ProjectDetails() {
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="w-50 h-20">
          {" "}
          <img
            src={img}
            className="h-full w-full object-cover rounded-lg border"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-black">
            Market Rental Habitate
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Market rental habitats offer a multitude of advantages to their
            residents, thanks to a prime location in the heart of Chomedey,
            Laval. The 3 rental phases feature a wide selection of all-inclusive
            units, equipped with high-end finishes and generous full- height
            windows that flood the spaces with natural light.
          </p>
        </div>
      </div>

      {/* Expandable sections */}
      {["Full description", "Contact details", "Real estate developer"].map(
        (item) => (
          <button
            key={item}
            className="w-full flex justify-between py-3 border-t text-sm font-medium"
          >
            {item}
            <span>+</span>
          </button>
        ),
      )}

      <ProjectFeatures />
    </div>
  );
}
