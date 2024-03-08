export const FooterSection = () => {
  return (
    <footer className="mx-auto w-full max-w-screen-xl rounded-lg bg-card px-10 py-8 shadow">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-muted-foreground sm:text-center">
          © 2023{" "}
          <a href="https://get-testimonials.com" className="hover:underline">
            GetTestimonials
          </a>
          . All Rights Reserved.
        </span>
        <ul className="mt-3 flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground sm:mt-0">
          <li>
            <a href="#pricing" className="hover:underline">
              Pricing
            </a>
          </li>
          <li>
            <a href="#features" className="hover:underline">
              Features
            </a>
          </li>
          <li>
            <a href="/products" className="hover:underline">
              App
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
