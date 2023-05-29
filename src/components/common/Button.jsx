/* This example requires Tailwind CSS v2.0+ */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ButtonMotion } from './../../core/Utils/AnimEffect';

export default function Button(props) {
  return (
    <>
      <div className="h-fit w-full bg-background-800 pb-10">
        <div className="w-fit h-fit mx-auto rounded-full">
          <Link to={props.url}>
            <motion.button
              variants={ButtonMotion}
              whileHover="hover"
              animate="visible"
              initial="hidden"
              type="button"
              className="block mx-auto px-7 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-button-600 hover:bg-button-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-500"
            >
              بیشتر
            </motion.button>
          </Link>
        </div>
      </div>
    </>
  );
}
