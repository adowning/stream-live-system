-- Table: public.account

-- DROP TABLE public.account;

CREATE TABLE public.account
(
    "acquisitionDate" timestamp with time zone,
    "accountName" text COLLATE pg_catalog."default",
    alert boolean,
    address2 text COLLATE pg_catalog."default",
    commercial boolean,
    city text COLLATE pg_catalog."default",
    "accountID" text COLLATE pg_catalog."default",
    "companyID" text COLLATE pg_catalog."default",
    "companyName" text COLLATE pg_catalog."default",
    email text COLLATE pg_catalog."default",
    "firstName" text COLLATE pg_catalog."default",
    "lastName" text COLLATE pg_catalog."default",
    state text COLLATE pg_catalog."default",
    "taxExempt" boolean,
    "taxID" text COLLATE pg_catalog."default",
    zip text COLLATE pg_catalog."default",
    phone1 text COLLATE pg_catalog."default",
    "lastInvoiceDate" timestamp with time zone,
    "averageInvoice" numeric,
    "invoiceCount" numeric,
    "lastEstimateCreatedDate" text COLLATE pg_catalog."default",
    "lastInvoiceAmount" numeric,
    id text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    "searchAddress" text COLLATE pg_catalog."default",
    "lastJobAmount" numeric,
    lat numeric,
    lng numeric,
    placeid text COLLATE pg_catalog."default",
    formatted_address text COLLATE pg_catalog."default",
    phone2 text COLLATE pg_catalog."default",
    phone3 text COLLATE pg_catalog."default",
    CONSTRAINT account_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.account
    OWNER to postgres;