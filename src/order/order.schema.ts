import { Schema } from 'mongoose';

const ConditionsSchema = new Schema({
  is_turn_on: Boolean,
  type: String,
  min_price: Number,
  max_price: Number,
  weight_unit: String,
}, { _id: false }); 

const ShippingRateSchema = new Schema({
  name: String,
  amount: Number,
  estimated_days: Number,
  conditions: ConditionsSchema,
  status: String,
  created_on: Number,
  updated_on: Number,
  is_free_ship: Boolean,
  servicelevel_name: String,
  is_flat_rate: Boolean,
  provider: String,
}, { _id: false });

export const OrderSchema = new Schema({
  order_status: String,
  payment_status: String,
  payment_method: String,
  pricing: {
    items_total: Number,
    items_discount: Number,
    sub_total: Number,
    total: Number,
    affiliate_discount: Number,
    shipping: Number,
    shipping_rate: ShippingRateSchema,
    sales_tax: Number,
    sales_tax_rates: Number,
    coupons: [
      {
        id: String,
        amount: Number,
        discount_amount: Number,
        provider: String,
        code: String,
      },
    ],
    coupon_discount_amount: Number,
    tax_information: {
      amount_to_collect: Number,
      breakdown: Object,
      freight_taxable: Boolean,
      has_nexus: Boolean,
      jurisdictions: {
        city: String,
        country: String,
        county: String,
        state: String,
      },
      order_total_amount: Number,
      rate: Number,
      shipping: Number,
      tax_source: String,
      taxable_amount: Number,
    },
  },
  timezone: String,
  source_from: String,
  created_on: Number,
  updated_on: Number,
  code: String,
});