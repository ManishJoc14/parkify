export interface SignUpWithEmailPROPS {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  hasAcceptedTerms: boolean;
  redirectUrl: string;
  accountType: "DRIVER" | "OWNER";
}

export interface User {
  id: number;
  photo: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  bio: string;
  phoneNo: string;
  email: string;
  dateJoined: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: string[];
}

export interface ParkingSpot {
  id: string;
  name: string;
  type: string;
  rate: number;
  address: string;
  status: "Available" | "Occupied" | "Reserved";
  image_url: string;
}

export interface ParkingLocation {
  uuid: string;
  name: string;
  coverImage: string;
  description: string;
  address: string;
  ratePerHour: string;
  latitude: number;
  longitude: number;
  postcode: string;
  ratePerDay: string;
  totalReviews: number;
  averageRating: number;
}

export interface DetailedParkingLocation extends ParkingLocation {
  description: string;
  features: ParkingFeature[];
  vehicleTypes: VehicleType[];
  images: string[];
  availableSpots: number;
  cancellationPolicy: string;
}

export type SortOption = "rate_per_hour" | "average_rating" | "distance";

export enum VehicleType {
  SMALL = "Small Car",
  MEDIUM = "Medium Car",
  SUV = "Large Car (SUV)",
  BIKE = "Bike",
  TRUCK = "Truck",
  MINIBUS = "Minibus",
  VAN = "Van",
}

export enum ParkingFeature {
  CCTV = "CCTV",
  EV_CHARGING = "EV Charging",
  SECURITY_LIGHTING = "Security Lighting",
  HANDICAP_ACCESSIBLE = "Handicap Accessible",
  COVERED = "Covered Parking",
  GUARDS = "Security Guards",
}

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  name: string;
  email: string;
  customer_id: string;
  amount: number;
  date: string;
  status: "pending" | "paid";
  image_url: string;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};
