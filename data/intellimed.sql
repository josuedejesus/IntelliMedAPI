PGDMP  8    .            
    |         
   IntelliMed    16.2    16.2 +    	           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    21339 
   IntelliMed    DATABASE     �   CREATE DATABASE "IntelliMed" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "IntelliMed";
                postgres    false            �            1259    21361    chat    TABLE     �   CREATE TABLE public.chat (
    chat_id integer NOT NULL,
    user_id integer,
    title character varying(100),
    date date DEFAULT now()
);
    DROP TABLE public.chat;
       public         heap    postgres    false                       0    0 
   TABLE chat    ACL     K   GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.chat TO intellimed_user;
          public          postgres    false    220            �            1259    21360    chat_chat_id_seq    SEQUENCE     �   CREATE SEQUENCE public.chat_chat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.chat_chat_id_seq;
       public          postgres    false    220                       0    0    chat_chat_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.chat_chat_id_seq OWNED BY public.chat.chat_id;
          public          postgres    false    219                       0    0    SEQUENCE chat_chat_id_seq    ACL     B   GRANT ALL ON SEQUENCE public.chat_chat_id_seq TO intellimed_user;
          public          postgres    false    219            �            1259    21373    message    TABLE     �   CREATE TABLE public.message (
    message_id integer NOT NULL,
    chat_id integer,
    message_time timestamp without time zone DEFAULT now(),
    sender character(1),
    content character varying(500)
);
    DROP TABLE public.message;
       public         heap    postgres    false                       0    0    TABLE message    ACL     N   GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.message TO intellimed_user;
          public          postgres    false    222            �            1259    21372    message_message_id_seq    SEQUENCE     �   CREATE SEQUENCE public.message_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.message_message_id_seq;
       public          postgres    false    222                       0    0    message_message_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.message_message_id_seq OWNED BY public.message.message_id;
          public          postgres    false    221                       0    0    SEQUENCE message_message_id_seq    ACL     H   GRANT ALL ON SEQUENCE public.message_message_id_seq TO intellimed_user;
          public          postgres    false    221            �            1259    21341    role    TABLE     b   CREATE TABLE public.role (
    role_id integer NOT NULL,
    description character varying(20)
);
    DROP TABLE public.role;
       public         heap    postgres    false                       0    0 
   TABLE role    ACL     K   GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.role TO intellimed_user;
          public          postgres    false    216            �            1259    21340    role_role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.role_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.role_role_id_seq;
       public          postgres    false    216                       0    0    role_role_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.role_role_id_seq OWNED BY public.role.role_id;
          public          postgres    false    215                       0    0    SEQUENCE role_role_id_seq    ACL     B   GRANT ALL ON SEQUENCE public.role_role_id_seq TO intellimed_user;
          public          postgres    false    215            �            1259    21348    user    TABLE     +  CREATE TABLE public."user" (
    user_id integer NOT NULL,
    name character varying(30),
    lastname character varying(30),
    email character varying(50),
    password character varying(200),
    date_of_birth date,
    gender character(1),
    phone character varying(10),
    role integer
);
    DROP TABLE public."user";
       public         heap    postgres    false                       0    0    TABLE "user"    ACL     M   GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public."user" TO intellimed_user;
          public          postgres    false    218            �            1259    21347    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          postgres    false    218                       0    0    users_user_id_seq    SEQUENCE OWNED BY     H   ALTER SEQUENCE public.users_user_id_seq OWNED BY public."user".user_id;
          public          postgres    false    217                       0    0    SEQUENCE users_user_id_seq    ACL     C   GRANT ALL ON SEQUENCE public.users_user_id_seq TO intellimed_user;
          public          postgres    false    217            a           2604    21364    chat chat_id    DEFAULT     l   ALTER TABLE ONLY public.chat ALTER COLUMN chat_id SET DEFAULT nextval('public.chat_chat_id_seq'::regclass);
 ;   ALTER TABLE public.chat ALTER COLUMN chat_id DROP DEFAULT;
       public          postgres    false    219    220    220            c           2604    21376    message message_id    DEFAULT     x   ALTER TABLE ONLY public.message ALTER COLUMN message_id SET DEFAULT nextval('public.message_message_id_seq'::regclass);
 A   ALTER TABLE public.message ALTER COLUMN message_id DROP DEFAULT;
       public          postgres    false    221    222    222            _           2604    21344    role role_id    DEFAULT     l   ALTER TABLE ONLY public.role ALTER COLUMN role_id SET DEFAULT nextval('public.role_role_id_seq'::regclass);
 ;   ALTER TABLE public.role ALTER COLUMN role_id DROP DEFAULT;
       public          postgres    false    215    216    216            `           2604    21351    user user_id    DEFAULT     o   ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 =   ALTER TABLE public."user" ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    217    218    218                      0    21361    chat 
   TABLE DATA           =   COPY public.chat (chat_id, user_id, title, date) FROM stdin;
    public          postgres    false    220   �,                 0    21373    message 
   TABLE DATA           U   COPY public.message (message_id, chat_id, message_time, sender, content) FROM stdin;
    public          postgres    false    222   �,                  0    21341    role 
   TABLE DATA           4   COPY public.role (role_id, description) FROM stdin;
    public          postgres    false    216   �,                 0    21348    user 
   TABLE DATA           n   COPY public."user" (user_id, name, lastname, email, password, date_of_birth, gender, phone, role) FROM stdin;
    public          postgres    false    218   -                  0    0    chat_chat_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.chat_chat_id_seq', 32, true);
          public          postgres    false    219                       0    0    message_message_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.message_message_id_seq', 50, true);
          public          postgres    false    221                       0    0    role_role_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.role_role_id_seq', 1, true);
          public          postgres    false    215                       0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 11, true);
          public          postgres    false    217            j           2606    21366    chat chat_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_pkey PRIMARY KEY (chat_id);
 8   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_pkey;
       public            postgres    false    220            l           2606    21380    message message_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_pkey PRIMARY KEY (message_id);
 >   ALTER TABLE ONLY public.message DROP CONSTRAINT message_pkey;
       public            postgres    false    222            f           2606    21346    role role_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public            postgres    false    216            h           2606    21353    user users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 ;   ALTER TABLE ONLY public."user" DROP CONSTRAINT users_pkey;
       public            postgres    false    218            n           2606    21367    chat chat_user_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.chat
    ADD CONSTRAINT chat_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id);
 @   ALTER TABLE ONLY public.chat DROP CONSTRAINT chat_user_id_fkey;
       public          postgres    false    220    4712    218            o           2606    21381    message message_chat_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.message
    ADD CONSTRAINT message_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chat(chat_id);
 F   ALTER TABLE ONLY public.message DROP CONSTRAINT message_chat_id_fkey;
       public          postgres    false    220    4714    222            m           2606    21354    user users_role_fkey    FK CONSTRAINT     v   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT users_role_fkey FOREIGN KEY (role) REFERENCES public.role(role_id);
 @   ALTER TABLE ONLY public."user" DROP CONSTRAINT users_role_fkey;
       public          postgres    false    216    218    4710                  x������ � �            x������ � �             x�3�tL����,.)JL�/����� K�>            x������ � �     