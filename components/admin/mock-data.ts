export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled"

export interface Order {
  id: string
  customer: { name: string; email: string; phone: string }
  date: string
  status: OrderStatus
  total: number
  payment: "Card" | "UPI" | "COD"
  shipping: { address: string; city: string; state: string; pincode: string }
  items: { name: string; quantity: number; price: number; image: string }[]
}

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  date: string
  read: boolean
}

export const orders: Order[] = [
  {
    id: "GG-10248",
    customer: { name: "Aanya Sharma", email: "aanya.s@gmail.com", phone: "+91 98201 12233" },
    date: "2026-04-28T10:32:00",
    status: "Processing",
    total: 4498,
    payment: "Card",
    shipping: { address: "12 Marine Drive, Apt 4B", city: "Mumbai", state: "Maharashtra", pincode: "400020" },
    items: [
      { name: "Aurora Solitaire", quantity: 1, price: 1299, image: "/images/products/solitaire-ring.jpg" },
      { name: "Petit Heart", quantity: 2, price: 999, image: "/images/products/heart-pendant.jpg" },
      { name: "Summer Chain", quantity: 1, price: 1201, image: "/images/products/waist-chain.jpg" },
    ],
  },
  {
    id: "GG-10247",
    customer: { name: "Riya Mehta", email: "riya.m@outlook.com", phone: "+91 99875 04412" },
    date: "2026-04-28T09:14:00",
    status: "Shipped",
    total: 1899,
    payment: "UPI",
    shipping: { address: "78 Lavelle Road", city: "Bangalore", state: "Karnataka", pincode: "560001" },
    items: [
      { name: "Starlight Stack", quantity: 1, price: 1899, image: "/images/products/stacking-rings.jpg" },
    ],
  },
  {
    id: "GG-10246",
    customer: { name: "Priya Iyer", email: "priya.iyer@gmail.com", phone: "+91 90121 33445" },
    date: "2026-04-27T17:48:00",
    status: "Delivered",
    total: 2598,
    payment: "Card",
    shipping: { address: "203 Park Street", city: "Kolkata", state: "West Bengal", pincode: "700016" },
    items: [
      { name: "Aurora Solitaire", quantity: 2, price: 1299, image: "/images/products/solitaire-ring.jpg" },
    ],
  },
  {
    id: "GG-10245",
    customer: { name: "Tara Kapoor", email: "tara.kapoor@yahoo.com", phone: "+91 98777 22556" },
    date: "2026-04-27T14:22:00",
    status: "Pending",
    total: 999,
    payment: "COD",
    shipping: { address: "5 Hauz Khas Village", city: "New Delhi", state: "Delhi", pincode: "110016" },
    items: [
      { name: "Petit Heart", quantity: 1, price: 999, image: "/images/products/heart-pendant.jpg" },
    ],
  },
  {
    id: "GG-10244",
    customer: { name: "Meera Nair", email: "meera.nair@gmail.com", phone: "+91 97001 88345" },
    date: "2026-04-27T11:05:00",
    status: "Delivered",
    total: 3198,
    payment: "Card",
    shipping: { address: "44 MG Road", city: "Kochi", state: "Kerala", pincode: "682011" },
    items: [
      { name: "Starlight Stack", quantity: 1, price: 1899, image: "/images/products/stacking-rings.jpg" },
      { name: "Petit Heart", quantity: 1, price: 999, image: "/images/products/heart-pendant.jpg" },
      { name: "Summer Chain", quantity: 1, price: 300, image: "/images/products/waist-chain.jpg" },
    ],
  },
  {
    id: "GG-10243",
    customer: { name: "Ishita Verma", email: "ishita.v@outlook.com", phone: "+91 99001 23456" },
    date: "2026-04-26T20:11:00",
    status: "Cancelled",
    total: 1299,
    payment: "UPI",
    shipping: { address: "8 Banjara Hills", city: "Hyderabad", state: "Telangana", pincode: "500034" },
    items: [
      { name: "Aurora Solitaire", quantity: 1, price: 1299, image: "/images/products/solitaire-ring.jpg" },
    ],
  },
  {
    id: "GG-10242",
    customer: { name: "Naina Bose", email: "naina.bose@gmail.com", phone: "+91 96523 11008" },
    date: "2026-04-26T13:42:00",
    status: "Shipped",
    total: 2298,
    payment: "Card",
    shipping: { address: "27 Civil Lines", city: "Jaipur", state: "Rajasthan", pincode: "302006" },
    items: [
      { name: "Summer Chain", quantity: 1, price: 1299, image: "/images/products/waist-chain.jpg" },
      { name: "Petit Heart", quantity: 1, price: 999, image: "/images/products/heart-pendant.jpg" },
    ],
  },
  {
    id: "GG-10241",
    customer: { name: "Sara Khan", email: "sara.khan@gmail.com", phone: "+91 98330 44211" },
    date: "2026-04-26T08:55:00",
    status: "Delivered",
    total: 999,
    payment: "Card",
    shipping: { address: "9 Aundh", city: "Pune", state: "Maharashtra", pincode: "411007" },
    items: [
      { name: "Petit Heart", quantity: 1, price: 999, image: "/images/products/heart-pendant.jpg" },
    ],
  },
]

export const messages: Message[] = [
  {
    id: "msg-501",
    name: "Anika Desai",
    email: "anika.desai@gmail.com",
    subject: "Ring sizing question",
    message:
      "Hi, I ordered the Aurora Solitaire in size 6 but it's slightly loose. Can I exchange for a smaller size? My order number is GG-10248. Thanks!",
    date: "2026-04-28T11:42:00",
    read: false,
  },
  {
    id: "msg-500",
    name: "Diya Bhatt",
    email: "diya.bhatt@outlook.com",
    subject: "Press inquiry — April feature",
    message:
      "Hello Glossy & Glow team, I'm a writer for Bazaar India and would love to feature your spring collection in our upcoming May issue. Could we set up a quick call?",
    date: "2026-04-28T09:18:00",
    read: false,
  },
  {
    id: "msg-499",
    name: "Niharika Pillai",
    email: "niharika.p@gmail.com",
    subject: "Custom engraving",
    message:
      "Do you offer custom engraving on the Petit Heart pendant? I'd like to add my mother's initials as a birthday gift.",
    date: "2026-04-27T22:05:00",
    read: true,
  },
  {
    id: "msg-498",
    name: "Kavya Reddy",
    email: "kavya.reddy@yahoo.com",
    subject: "Delivery delay",
    message:
      "Hi, my order GG-10240 was supposed to arrive yesterday but I haven't received any update. Could someone please look into this for me?",
    date: "2026-04-27T16:30:00",
    read: true,
  },
  {
    id: "msg-497",
    name: "Avantika Joshi",
    email: "avantika.joshi@gmail.com",
    subject: "Wholesale partnership",
    message:
      "I run a small concept store in Goa and would love to carry your pieces. Could you share your wholesale catalogue and minimum order requirements?",
    date: "2026-04-27T11:24:00",
    read: true,
  },
  {
    id: "msg-496",
    name: "Saanvi Gupta",
    email: "saanvi.g@gmail.com",
    subject: "Care instructions",
    message:
      "Could you share detailed care instructions for the Summer Chain? I want to make sure it stays beautiful for years.",
    date: "2026-04-26T20:48:00",
    read: true,
  },
  {
    id: "msg-495",
    name: "Tanvi Rao",
    email: "tanvi.rao@outlook.com",
    subject: "Loved my order!",
    message:
      "Just received my Starlight Stack and I'm completely in love. The packaging alone made my day. Thank you for the handwritten note!",
    date: "2026-04-26T14:11:00",
    read: true,
  },
]

export function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
}

export function formatDateTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function relativeDay(iso: string) {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHr / 24)
  if (diffMin < 1) return "Just now"
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHr < 24) return `${diffHr}h ago`
  if (diffDay < 7) return `${diffDay}d ago`
  return formatDate(iso)
}
