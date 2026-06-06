function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const baseStyles = "rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black hover:opacity-90",
    secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm",
    outline: "border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10",
    ghost: "text-white/70 hover:text-white hover:bg-white/5"
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };
  return <button
    className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
      {children}
    </button>;
}
export {
  Button
};
