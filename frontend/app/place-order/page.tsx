"use client";

import { useMemo, useState, type FormEvent } from "react";
import CartTotals from "@/components/cart/CartTotals";
import DeliveryForm, {
  type DeliveryFormValues,
} from "@/components/checkout/DeliveryForm";
import PaymentMethod, {
  type PaymentMethodValue,
} from "@/components/checkout/PaymentMethod";
import Title from "@/components/ui/Title";
import { DEMO_CART_ITEMS, getCartSubtotal } from "@/lib/cartDemo";

const emptyForm: DeliveryFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  phone: "",
};

export default function PlaceOrderPage() {
  const [form, setForm] = useState<DeliveryFormValues>(emptyForm);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodValue>("cod");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const subtotal = useMemo(() => getCartSubtotal(DEMO_CART_ITEMS), []);

  const handleFieldChange = (
    field: keyof DeliveryFormValues,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    const missing = Object.entries(form).some(([, value]) => !value.trim());
    if (missing) {
      setError("Please fill in all delivery fields.");
      return;
    }

    setMessage("Please sign in to continue.");
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 md:px-10 md:py-10">
      <form
        onSubmit={handleSubmit}
        className="grid gap-12 lg:grid-cols-[minmax(0,575px)_minmax(0,1fr)] lg:items-start lg:justify-between lg:gap-16"
      >
        <section>
          <div className="mb-8">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>
          <DeliveryForm values={form} onChange={handleFieldChange} />
        </section>

        <section className="lg:ml-auto lg:w-full lg:max-w-xl">
          <CartTotals subtotal={subtotal} />

          <div className="mt-12">
            <div className="mb-6">
              <Title text1="PAYMENT" text2="METHOD" />
            </div>
            <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />
          </div>

          <div className="mt-10 flex flex-col items-stretch sm:items-end">
            <button
              type="submit"
              className="w-full bg-foreground px-8 py-3.5 text-sm tracking-wide text-background uppercase sm:w-auto sm:min-w-[262px]"
            >
              Place Order
            </button>

            {error ? (
              <p className="mt-3 text-sm text-accent" role="alert">
                {error}
              </p>
            ) : null}
            {message ? (
              <p className="mt-3 text-sm text-muted" role="status">
                {message}
              </p>
            ) : null}
          </div>
        </section>
      </form>
    </div>
  );
}
