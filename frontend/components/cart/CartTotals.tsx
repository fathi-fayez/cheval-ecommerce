import Title from "@/components/ui/Title";
import { SHIPPING_FEE } from "@/lib/cartDemo";

type CartTotalsProps = {
  subtotal: number;
  showTitle?: boolean;
  className?: string;
};

export default function CartTotals({
  subtotal,
  showTitle = true,
  className = "",
}: CartTotalsProps) {
  const hasItems = subtotal > 0;
  const shipping = hasItems ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  return (
    <div className={`w-full max-w-md ${className}`}>
      {showTitle ? (
        <div className="mb-6">
          <Title text1="CART" text2="TOTALS" />
        </div>
      ) : null}

      <div className="space-y-3 text-sm sm:text-base">
        <div className="flex items-center justify-between border-b border-border pb-3 text-muted">
          <span>Subtotal</span>
          <span className="text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-border pb-3 text-muted">
          <span>Shipping Fee</span>
          <span className="text-foreground">${shipping}</span>
        </div>
        <div className="flex items-center justify-between pt-1 font-semibold text-foreground">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
