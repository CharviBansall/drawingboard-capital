

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."asset_managers" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."asset_managers" OWNER TO "postgres";


COMMENT ON TABLE "public"."asset_managers" IS 'the folks who manage the portfolios';



CREATE TABLE IF NOT EXISTS "public"."fund_managers" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying(255) NOT NULL,
    "description" "text",
    "website" character varying(200),
    "founded_date" "date",
    "aum" numeric(20,2),
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "logo" "text",
    "slug" "text"
);


ALTER TABLE "public"."fund_managers" OWNER TO "postgres";


COMMENT ON TABLE "public"."fund_managers" IS 'the companies that manage the funds';



CREATE TABLE IF NOT EXISTS "public"."funds" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "fund_type" character varying(3) NOT NULL,
    "description" "text",
    "objective" "text",
    "minimum_investment" numeric(20,2),
    "is_active" boolean DEFAULT true NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "document_due_date" "date",
    "strategy" "text",
    "substrategy" "text",
    "fund_manager_id" "uuid" DEFAULT "gen_random_uuid"(),
    CONSTRAINT "fund_fund_type_check" CHECK ((("fund_type")::"text" = ANY ((ARRAY['PE'::character varying, 'PFI'::character varying, 'HF'::character varying, 'PRI'::character varying, 'PD'::character varying, 'PRA'::character varying])::"text"[])))
);


ALTER TABLE "public"."funds" OWNER TO "postgres";


COMMENT ON TABLE "public"."funds" IS 'available funds managed by fund managers';



CREATE TABLE IF NOT EXISTS "public"."portfolio_funds" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "status" character varying[],
    "fund_id" "uuid" DEFAULT "gen_random_uuid"(),
    "amount" numeric,
    "portfolio_id" "uuid" DEFAULT "gen_random_uuid"()
);


ALTER TABLE "public"."portfolio_funds" OWNER TO "postgres";


COMMENT ON TABLE "public"."portfolio_funds" IS 'mapping of each fund to each portfolio';



CREATE TABLE IF NOT EXISTS "public"."portfolios" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text"
);


ALTER TABLE "public"."portfolios" OWNER TO "postgres";


ALTER TABLE ONLY "public"."asset_managers"
    ADD CONSTRAINT "asset_manager_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."asset_managers"
    ADD CONSTRAINT "asset_manager_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."fund_managers"
    ADD CONSTRAINT "fund_manager_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."funds"
    ADD CONSTRAINT "fund_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."portfolio_funds"
    ADD CONSTRAINT "portfolio_funds_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."portfolios"
    ADD CONSTRAINT "portfolios_id_key" UNIQUE ("id");



ALTER TABLE ONLY "public"."portfolios"
    ADD CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset_managers"
    ADD CONSTRAINT "asset_manager_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."funds"
    ADD CONSTRAINT "funds_fund_manager_id_fkey" FOREIGN KEY ("fund_manager_id") REFERENCES "public"."fund_managers"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."portfolio_funds"
    ADD CONSTRAINT "portfolio_funds_fund_id_fkey" FOREIGN KEY ("fund_id") REFERENCES "public"."funds"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."portfolio_funds"
    ADD CONSTRAINT "portfolio_funds_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolios"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE "public"."asset_managers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."fund_managers" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."funds" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."portfolio_funds" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."portfolios" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON TABLE "public"."asset_managers" TO "anon";
GRANT ALL ON TABLE "public"."asset_managers" TO "authenticated";
GRANT ALL ON TABLE "public"."asset_managers" TO "service_role";



GRANT ALL ON TABLE "public"."fund_managers" TO "anon";
GRANT ALL ON TABLE "public"."fund_managers" TO "authenticated";
GRANT ALL ON TABLE "public"."fund_managers" TO "service_role";



GRANT ALL ON TABLE "public"."funds" TO "anon";
GRANT ALL ON TABLE "public"."funds" TO "authenticated";
GRANT ALL ON TABLE "public"."funds" TO "service_role";



GRANT ALL ON TABLE "public"."portfolio_funds" TO "anon";
GRANT ALL ON TABLE "public"."portfolio_funds" TO "authenticated";
GRANT ALL ON TABLE "public"."portfolio_funds" TO "service_role";



GRANT ALL ON TABLE "public"."portfolios" TO "anon";
GRANT ALL ON TABLE "public"."portfolios" TO "authenticated";
GRANT ALL ON TABLE "public"."portfolios" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






RESET ALL;
