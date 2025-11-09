export default function SuccessPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-600">✅ Payment Successful!</h1>
      <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
      <a
        href="/products"
        className="text-blue-600 font-medium hover:underline"
      >
        Continue Shopping →
      </a>
    </section>
  );
}
