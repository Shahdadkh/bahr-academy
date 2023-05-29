export const sampleAnimation = {
  hidden: {
    scale: 0.8,
    opacity: 0,
    x: "-100vw",
    rotate: -180,
  },
  visible: {
    scale: 1,
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 1.8,
      type: "spring",
    },
  },
};

export const NewsMotion = {
  hover: { scale: 1.03 },
  hidden: {
    opacity: 0,
    y: "200px",
  },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      type: "Spring",
    },
  },
};

export const InputRightMotion = {
  hidden: {
    opacity: 0,
    x: "250px",
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 1.5,
      type: "Spring",
    },
  },
};

export const InputLeftMotion = {
  hidden: {
    opacity: 0,
    x: "-250px",
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 1.5,
      type: "Spring",
    },
  },
};

export const ButtonMotion = {
  hover: { scale: 1.1 },
  hidden: {
    opacity: 0,
    y: "200px",
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.5,
      type: "Spring",
    },
  },
};
