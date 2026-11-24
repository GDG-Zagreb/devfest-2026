import { ArrowRight, Dumbbell } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    title: "Build",
    text: "Bring your laptop and work on a DevFest API project.",
  },
  {
    title: "Submit",
    text: "Submit your solution alongside the talks and workshops.",
  },
  {
    title: "Climb the leaderboard",
    text: "Follow the leaderboard as projects are scored.",
  },
];

export default function BuildersTrack() {
  return (
    <section id="builders" className="scroll-mt-20 py-16">
      <div className="max-w-6xl mx-auto rounded-3xl border border-accent-red/30 bg-accent-red/5 p-6 md:p-10">
        <div className="space-y-5 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-red/10 border border-accent-red/30">
            <Dumbbell className="w-5 h-5 text-accent-red" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-widest text-gray-800 dark:text-gray-200">
              Builders Track
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Builders Track is coming to DevFest Croatia 2026!
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300">
            Want to build, not just listen? The Builders Track brings hands-on
            challenges alongside the talks and workshops.
          </p>

          <p className="text-lg text-gray-700 dark:text-gray-300">
            Whether you are experimenting with AI-powered development or love a
            good coding challenge, this track is for you.
          </p>

          <Link
            href="/builders"
            className="inline-flex items-center justify-center gap-2 px-8 h-14 rounded-2xl bg-accent-red text-white text-xl font-bold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Explore the Builders API
            <ArrowRight className="w-5 h-5" aria-hidden />
          </Link>
        </div>

        {/* Steps */}
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex items-start gap-4 rounded-2xl bg-white/60 dark:bg-gray-900/40 border border-accent-red/20 p-5"
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-accent-red text-white flex items-center justify-center font-bold">
                {index + 1}
              </span>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
