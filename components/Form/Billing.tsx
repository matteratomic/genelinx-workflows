import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

export const Billing = ({
  register,
  errors
}) => {
  return <>
    <CardHeader>
      <CardTitle>Payment Details</CardTitle>
      <CardDescription>Enter your payment information to complete the booking.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input id="cardNumber" {...register('cardNumber')} />
        {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input id="expiryDate" placeholder="MM/YY" {...register('expiryDate')} />
          {/* {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate.message}</p>} */}
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" {...register('cvv')} />
          {/* {errors.cvv && <p className="text-sm text-red-500">{errors.cvv.message}</p>} */}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="billingAddress">Billing Address</Label>
        <Textarea
          id="billingAddress"
          placeholder="Enter your billing address"
          {...register('billingAddress')}
        />
        {/* {errors.billingAddress && <p className="text-sm text-red-500">{errors.billingAddress.message}</p>} */}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" {...register('agreeToTerms')} />
        <Label htmlFor="terms" className="text-sm">
          I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a>
        </Label>
      </div>
      {/* {errors.agreeToTerms && <p className="text-sm text-red-500">You must agree to the terms and conditions</p>} */}
    </CardContent>

  </>
}
