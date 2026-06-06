import { GlassCard } from "../components/glass-card.jsx";

const posts = [
  { title: "How to prepare your car for monsoon", author: "Asha", excerpt: "Simple steps to keep your vehicle safe and shiny during heavy rains." },
  { title: "Best detailing tips for paint protection", author: "Ravi", excerpt: "Learn which treatments help your finish last longer." },
  { title: "Top 5 service partners in Delhi", author: "Priya", excerpt: "Verified providers with excellent customer reviews and fast delivery." }
];

export function Community() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Community</h1>
          <p className="mt-3 text-foreground/70">Connect with vehicle owners and service experts across the ShineUp community.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <GlassCard key={post.title} className="p-6">
              <h2 className="text-2xl font-semibold mb-3">{post.title}</h2>
              <p className="text-foreground/70 mb-4">{post.excerpt}</p>
              <p className="text-sm text-foreground/60">Posted by {post.author}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
