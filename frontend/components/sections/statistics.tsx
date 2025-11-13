"use client";

import { motion } from "framer-motion";

const statsData = [
  {
    value: "50k+",
    description: "Successful<br />placements",
  },
  {
    value: "150k+",
    description: "Active<br />users",
  },
  {
    value: "4.8",
    description: "Avg. rating on<br />app stores",
  },
];

const Statistics = () => {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 text-center md:grid-cols-3 md:gap-x-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h3 className="text-5xl font-bold leading-none text-foreground md:text-[56px]">
                {stat.value}
              </h3>
              <p
                className="mt-4 text-base text-foreground"
                dangerouslySetInnerHTML={{ __html: stat.description }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
