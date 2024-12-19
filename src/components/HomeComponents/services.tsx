import { services } from "@/data/services";
import ServiceCardLarge from "./serviceCardLarge";
import ServicesHeader from "./servicesHeader";

export default function Services() {
  return (
    <div className="container mx-auto py-16">
      <ServicesHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-8 px-4 py-2 sm:px-16">
        {services.map((service, index) => (
          <ServiceCardLarge
            key={index}
            image={service.image}
            title={service.title}
            distance={service.distance}
            price={service.price}
            rating={service.rating}
            slots={service.slots}
            location={service.location}
          />
        ))}
        {[...services].reverse().map((service, index) => (
          <ServiceCardLarge
            key={index}
            image={service.image}
            title={service.title}
            distance={service.distance}
            price={service.price}
            rating={service.rating}
            slots={service.slots}
            location={service.location}
          />
        ))}
      </div>
    </div>
  );
}
