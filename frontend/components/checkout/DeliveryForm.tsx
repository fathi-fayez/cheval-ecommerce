"use client";

export type DeliveryFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
};

type DeliveryFormProps = {
  values: DeliveryFormValues;
  onChange: (field: keyof DeliveryFormValues, value: string) => void;
};

const fieldClassName =
  "h-[50px] w-full border border-[#c2c2c2] bg-background px-3.5 text-sm text-foreground outline-none placeholder:text-[#8b8b8b] sm:text-base";

export default function DeliveryForm({ values, onChange }: DeliveryFormProps) {
  return (
    <div className="grid gap-4 sm:gap-5">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <input
          type="text"
          placeholder="First name"
          value={values.firstName}
          onChange={(event) => onChange("firstName", event.target.value)}
          className={fieldClassName}
          required
        />
        <input
          type="text"
          placeholder="Last name"
          value={values.lastName}
          onChange={(event) => onChange("lastName", event.target.value)}
          className={fieldClassName}
          required
        />
      </div>

      <input
        type="email"
        placeholder="Email address"
        value={values.email}
        onChange={(event) => onChange("email", event.target.value)}
        className={fieldClassName}
        required
      />

      <input
        type="text"
        placeholder="Street"
        value={values.street}
        onChange={(event) => onChange("street", event.target.value)}
        className={fieldClassName}
        required
      />

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <input
          type="text"
          placeholder="City"
          value={values.city}
          onChange={(event) => onChange("city", event.target.value)}
          className={fieldClassName}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={values.state}
          onChange={(event) => onChange("state", event.target.value)}
          className={fieldClassName}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <input
          type="text"
          placeholder="Zip code"
          value={values.zip}
          onChange={(event) => onChange("zip", event.target.value)}
          className={fieldClassName}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={values.country}
          onChange={(event) => onChange("country", event.target.value)}
          className={fieldClassName}
          required
        />
      </div>

      <input
        type="tel"
        placeholder="Phone"
        value={values.phone}
        onChange={(event) => onChange("phone", event.target.value)}
        className={fieldClassName}
        required
      />
    </div>
  );
}
