import Link from "next/link";
import { CircleHelp, Lightbulb, Search, SlidersHorizontal, Activity, RefreshCw } from "lucide-react";
import { ExpandableImage } from "@/components/case-study/expandable-image";
import { ViewportVideo } from "@/components/case-study/viewport-video";
import { ContentsNav } from "@/components/case-study/contents-nav";
import { BackToTop } from "@/components/case-study/back-to-top";
import { dashboardDetails, dashboardImages as images } from "@/data/personalized-dashboards";
import "./case-study.css";

const themes = [
  { Icon: Search, title: "Quick access", text: "Reduce repeated searching and reporting work." },
  { Icon: SlidersHorizontal, title: "Personalization", text: "Let users organize dashboards around their own needs." },
  { Icon: Activity, title: "Deeper insights", text: "Give users additional context behind their data." },
  { Icon: RefreshCw, title: "Data freshness", text: "Make updates and refresh states understandable." },
];

export function PersonalizedDashboards() {
  return (
    <div className="case-layout" id="case-top" tabIndex={-1}>
      <article className="case-article">
        <section id="overview" className="case-overview" aria-labelledby="case-title">
          <Link href="/" className="case-back">Back</Link>
          <h1 id="case-title">Personalized Dashboards</h1>
          <p className="case-lead">Making complex data easier to explore, understand, and personalize.</p>
          <p>During my co-op at WSIB, I worked alongside another designer and three developers to design a personalized dashboard experience for Meredith Data, an internal AI-powered analytics tool.</p>
          <p>The goal was to give users a simpler way to keep track of important information, organize insights around their needs, and explore their data without having to start from scratch every time.</p>
          <h2 className="case-small-heading">Project Highlights</h2>
          <dl className="case-highlights">
            {[['5', 'User Interviews'], ['4', 'Research Themes'], ['4', 'Core Feature Areas']].map(([number, label]) => <div key={label}><dt>{label}</dt><dd>{number}</dd></div>)}
          </dl>
          <ExpandableImage image={images.overview} label="dashboard overview" priority />
          <dl className="case-metadata">
            <div><dt>Role</dt><dd>UX/UI Design Associate</dd></div>
            <div><dt>Team</dt><dd>2 designers<br />3 developers</dd></div>
            <div><dt>Tools</dt><dd>Figma<br />Figma Make<br />Figma Agent</dd></div>
            <div><dt>Focus</dt><dd>Dashboard Design<br />User Flows<br />Interaction Design<br />Prototyping</dd></div>
            <div><dt>Scope</dt><dd>User research → High-fidelity design</dd></div>
          </dl>
        </section>

        <div className="case-body">
          <section id="the-challenge" className="case-section" aria-labelledby="challenge-title">
            <h2 id="challenge-title">The Challenge</h2>
            <h3>Making data more accessible.</h3>
            <p>Meredith Data is an internal analytics platform that lets users explore organizational data by asking questions in natural language.</p>
            <p>While this made retrieving information more accessible, users still needed an easier way to revisit their results, keep track of important metrics, and organize information around their day-to-day work.</p>
            <p>We saw an opportunity to take the experience beyond individual questions and answers by introducing a personalized dashboard.</p>
            <div className="case-callout case-question"><CircleHelp aria-hidden="true" size={24} /><p>How might we help users turn their data queries into an organized, customizable dashboard that supports their daily workflows?</p></div>
            <p>The goal was to create an experience that felt flexible enough to support different users, while still being simple and intuitive to navigate.</p>
          </section>

          <section id="understanding-our-users" className="case-section" aria-labelledby="users-title">
            <h2 id="users-title">Understanding Our Users</h2>
            <p>Before diving into designs, we conducted user interviews to better understand how people were using Meredith Data, where they were running into challenges, and what they wanted out of a personalized dashboard.</p>
            <h3>Making sense of the feedback.</h3>
            <p>To help synthesize our findings, I experimented with Microsoft Copilot and Figma’s AI agent to support our affinity mapping process.</p>
            <p>We organized interview feedback into themes, including use cases, suggestions, pain points, and priorities, and used these groupings to identify areas worth exploring further.</p>
            <p>Four key themes emerged:</p>
            <div className="case-themes">{themes.map(({ Icon, title, text }) => <div key={title} className="case-theme"><Icon size={26} strokeWidth={1.8} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></div>)}</div>
            <div className="case-research"><h3>Research Synthesis</h3><p>User interviews → Affinity mapping</p><ExpandableImage image={images.research} label="research affinity map" /></div>
          </section>

          <section id="early-explorations" className="case-section" aria-labelledby="explorations-title">
            <h2 id="explorations-title">Early Explorations</h2>
            <p>With our research findings in mind, we started brainstorming how a personalized dashboard could fit into the existing Meredith Data experience.</p>
            <p>I experimented with <strong>Figma Make</strong> to quickly generate some early concepts and explore different ways to structure the dashboard. It was a useful starting point for testing ideas without spending too much time building out individual screens.</p>
            <p>From there, we moved into low-fidelity wireframes, exploring different layouts, widget sizes, and ways users could interact with their dashboards.</p>
            <p>The goal at this stage wasn’t to get everything perfect, but to see what worked, what didn’t, and which ideas were worth developing further.</p>
            <div className="case-explorations">
              {[
                { image: images.brainstorming, title: 'Brainstorming', caption: 'Quick concepts generated with Figma Make.' },
                { image: images.lowFidelity, title: 'Low-fidelity', caption: 'Exploring dashboard structures and user flows.' },
                { image: images.refinement, title: 'Refinement', caption: 'Choosing promising ideas to develop further.' },
              ].map(({ image, title, caption }, index) => <figure key={title}><p className="case-index">0{index + 1}</p><ExpandableImage image={image} label={title.toLowerCase()} /><figcaption><h3>{title}</h3><p>{caption}</p></figcaption></figure>)}
            </div>
          </section>

          <section id="iterating" className="case-section" aria-labelledby="iterating-title">
            <h2 id="iterating-title">Iterations and Iterations...</h2>
            <p>As we moved into more detailed designs, I wanted to see how far I could push Figma Make beyond early brainstorming.</p>
            <p>I experimented with using our existing design system to generate mid-fidelity screens, hoping it would help speed up the transition from wireframes to more polished designs.</p>
            <p>While it was helpful for exploring possibilities, the results weren’t quite capturing the interactions and layout details I had in mind.</p>
            <p>Rather than spending more time trying to refine the AI-generated outputs, I decided to move back into Figma and build out the mid- and high-fidelity designs myself.</p>
            <p>This gave me more control over the finer details, particularly the widget layouts, editing interactions, and different UI states that were important to the experience.</p>
            <div className="case-callout"><div className="case-callout-heading"><Lightbulb size={24} aria-hidden="true" /><h3>A Design Takeaway</h3></div><p>AI was useful for getting ideas onto the canvas quickly, but more detailed interactions still needed hands-on design work. Knowing when to switch approaches helped me focus on building an experience that better matched what we were trying to achieve.</p></div>
            <div className="case-iterations">
              <figure><ExpandableImage image={images.highFidelityV1} label="high-fidelity version one" /><figcaption><h3>High-fidelity V1</h3><p>Establishing the visual direction, dashboard structure, and initial interactions.</p></figcaption></figure>
              <figure><ExpandableImage image={images.highFidelityV2} label="high-fidelity version two" /><figcaption><h3>High-fidelity V2</h3><p>Further refining the widget layouts, editing interactions, and detailed UI states.</p></figcaption></figure>
            </div>
          </section>

          <section id="the-details" className="case-section" aria-labelledby="details-title">
            <h2 id="details-title">The Details</h2>
            <p>Beyond the overall dashboard layout, a big part of the design work involved thinking through the smaller interactions.</p>
            <p>We wanted users to have flexibility in how they worked with their data, without making the experience unnecessarily complicated.</p>
            <div className="case-detail-list">
              {dashboardDetails.map(({ title, paragraphs }, index) => (
                <div key={title} className="case-detail">
                  <h3><span>0{index + 1}</span> {title}</h3>
                  {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              ))}
            </div>
          </section>

          <section id="final-experience" className="case-section" aria-labelledby="final-title">
            <h2 id="final-title">The Final Experience</h2>
            <p>The final designs bring data exploration, saved insights, and dashboard customization into one experience.</p>
            <p>Users can keep frequently accessed information in one place, organize widgets around their own priorities, and explore the details behind their data when they need more context.</p>
            <p>Together, these features were designed to make working with operational data feel more organized, flexible, and approachable.</p>
            <ViewportVideo />
          </section>

          <section id="reflections" className="case-section" aria-labelledby="reflections-title">
            <h2 id="reflections-title">Reflections</h2>
            <h3>What I learned along the way.</h3>
            <p>This project gave me the opportunity to contribute to a feature from early research and exploration through to detailed UI designs, while collaborating with another designer and our development team.</p>
            <p>One of my biggest takeaways was learning how much thought goes into the smaller interactions. Designing a dashboard wasn’t just about making information look organized. It was about thinking through how people would actually use it, customize it, and make sense of their data.</p>
            <p>I also learned a lot from experimenting with AI throughout the process. Tools like Copilot and Figma’s AI agent helped support research synthesis, while Figma Make was useful for brainstorming and exploring ideas quickly. But when it came to more detailed designs, I found that working directly in Figma gave me the control I needed.</p>
            <p>Overall, the experience helped me become more intentional about my design decisions, more comfortable working through complex interactions, and more thoughtful about how I use different tools in my workflow.</p>
          </section>
        </div>
      </article>
      <ContentsNav />
      <BackToTop />
    </div>
  );
}
