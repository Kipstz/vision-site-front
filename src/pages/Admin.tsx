/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { loggedApi } from "../axios";
import { enqueueSnackbar } from "notistack";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import StoreContext from "../StoreContext";
import { Add } from "@mui/icons-material";

export const Admin: React.FC = () => {
  const { rules, panelElements } = useContext(StoreContext);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentTab, setCurrentTab] = useState(null);
  const [data, setData] = useState<any>({});
  const [events, setEvents] = useState([]);
  const [patchs, setPatchs] = useState([]);
  const [news, setNews] = useState([]);
  const [cayonews, setCayoNews] = useState([]);
  const [users, setUsers] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [musicians, setMusicians] = useState([]);
  const [musics, setMusics] = useState([]);
  const [bestOfs, setBestOfs] = useState([]);
  const [modifSelection, setModifSelection] = useState(null);
  const [file, setFile] = useState<File>();
  const [disabled, setDisabled] = useState(false);
  const [rulesStructure, setRulesStructure] = useState(null);
  const [rulesStructure2, setRulesStructure2] = useState(null);

  // ON-NEW-CATEGORY

  const adminConfig = [
    {
      name: "event",
      label: "évènements",
      items: [
        {
          name: "Ajouter",
          inputs: [
            {
              name: "type",
              type: "select",
              values: [
                { label: "WhiteList", value: 0 },
                { label: "FreeAccess", value: 1 },
              ],
              label: "Serveur concerné",
            },
            {
              name: "title",
              type: "text",
              label: "Titre",
            },
            {
              name: "place",
              type: "text",
              label: "Lieu",
            },
            {
              name: "date",
              type: "datetime",
              label: "Date",
            },
            {
              name: "image",
              type: "text",
              label: "Lien de l'image",
            },
          ],
        },
        {
          name: "Modifier",
          selectionList: true,
          selectionName: "eventId",
          inputs: [
            {
              name: "type",
              type: "select",
              values: [
                { label: "WhiteList", value: 0 },
                { label: "FreeAccess", value: 1 },
              ],
              label: "Serveur concerné",
            },
            {
              name: "title",
              type: "text",
              label: "Titre",
            },
            {
              name: "place",
              type: "text",
              label: "Lieu",
            },
            {
              name: "date",
              type: "datetime",
              label: "Date",
            },
            {
              name: "image",
              type: "text",
              label: "Lien de l'image",
            },
          ],
        },
        {
          name: "Supprimer",
          selectionList: true,
          selectionName: "eventId",
        },
      ],
    },
    {
      name: "patch",
      label: "patch notes",
      items: [
        {
          name: "Ajouter",
          inputs: [
            {
              name: "date",
              type: "datetime",
              label: "Date",
            },
            {
              name: "image",
              type: "text",
              label: "Lien de l'image",
            },
          ],
        },
        {
          name: "Modifier",
          selectionList: true,
          selectionName: "patchId",
          inputs: [
            {
              name: "date",
              type: "datetime",
              label: "Date",
            },
            {
              name: "image",
              type: "text",
              label: "Lien de l'image",
            },
          ],
        },
        {
          name: "Supprimer",
          selectionList: true,
          selectionName: "patchId",
        },
      ],
    },
    {
      name: "news",
      label: "weazel news",
      items: [
        {
          name: "Ajouter",
          inputs: [
            {
              name: "date",
              type: "datetime",
              label: "Date de parrution",
            },
            {
              name: "media",
              type: "text",
              label: "Lien du contenu multimédia",
              tooltip:
                "Si l'article est une vidéo, mettez le lien de la vidéo YouTube. Pour cela, allez sur la vidéo YouTube, puis dans Partager, et copiez le lien. Sinon, mettez un lien vers une image.",
            },
            {
              name: "title",
              type: "text",
              label: "Titre de l'article",
            },
            {
              name: "content",
              type: "textarea",
              label: "Contenu de l'article",
            },
            {
              name: "type",
              type: "select",
              values: ["video", "text", "image"],
              label: "Type d'article",
            },
            {
              name: "characterId",
              type: "select",
              values: "characters",
              label: "Auteur de l'article",
            },
            {
              name: "serverType",
              type: "select",
              values: [
                { label: "WhiteList", value: 0 },
                { label: "FreeAccess", value: 1 },
              ],
              label: "Serveur concerné",
            },
          ],
        },
        {
          name: "Modifier",
          selectionList: true,
          selectionName: "newsId",
          inputs: [
            {
              name: "date",
              type: "datetime",
              label: "Date de parrution",
            },
            {
              name: "media",
              type: "text",
              label: "Lien du contenu multimédia",
            },
            {
              name: "title",
              type: "text",
              label: "Titre de l'article",
            },
            {
              name: "content",
              type: "textarea",
              label: "Contenu de l'article",
            },
            {
              name: "type",
              type: "select",
              values: ["video", "text", "image"],
              label: "Type d'article",
            },
            {
              name: "characterId",
              type: "select",
              values: "characters",
              label: "Auteur de l'article",
            },
            {
              name: "serverType",
              type: "select",
              values: [
                { label: "WhiteList", value: 0 },
                { label: "FreeAccess", value: 1 },
              ],
              label: "Serveur concerné",
            },
          ],
        },
        {
          name: "Supprimer",
          selectionList: true,
          selectionName: "newsId",
        },
      ],
    },
    {
      name: "cayo-news",
      label: "cayo news",
      items: [
        {
          name: "Ajouter",
          inputs: [
            {
              name: "date",
              type: "datetime",
              label: "Date de parrution",
            },
            {
              name: "media",
              type: "text",
              label: "Lien du contenu multimédia",
              tooltip:
                "Si l'article est une vidéo, mettez le lien de la vidéo YouTube. Pour cela, allez sur la vidéo YouTube, puis dans Partager, et copiez le lien. Sinon, mettez un lien vers une image.",
            },
            {
              name: "title",
              type: "text",
              label: "Titre de l'article",
            },
            {
              name: "content",
              type: "textarea",
              label: "Contenu de l'article",
            },
            {
              name: "type",
              type: "select",
              values: ["video", "text", "image"],
              label: "Type d'article",
            },
            {
              name: "characterId",
              type: "select",
              values: "characters",
              label: "Auteur de l'article",
            },
            {
              name: "serverType",
              type: "select",
              values: [
                { label: "WhiteList", value: 0 },
                { label: "FreeAccess", value: 1 },
              ],
              label: "Serveur concerné",
            },
          ],
        },
        {
          name: "Modifier",
          selectionList: true,
          selectionName: "newsId",
          inputs: [
            {
              name: "date",
              type: "datetime",
              label: "Date de parrution",
            },
            {
              name: "media",
              type: "text",
              label: "Lien du contenu multimédia",
            },
            {
              name: "title",
              type: "text",
              label: "Titre de l'article",
            },
            {
              name: "content",
              type: "textarea",
              label: "Contenu de l'article",
            },
            {
              name: "type",
              type: "select",
              values: ["video", "text", "image"],
              label: "Type d'article",
            },
            {
              name: "characterId",
              type: "select",
              values: "characters",
              label: "Auteur de l'article",
            },
            {
              name: "serverType",
              type: "select",
              values: [
                { label: "WhiteList", value: 0 },
                { label: "FreeAccess", value: 1 },
              ],
              label: "Serveur concerné",
            },
          ],
        },
        {
          name: "Supprimer",
          selectionList: true,
          selectionName: "newsId",
        },
      ],
    },
    {
      name: "character",
      label: "personnages rp",
      items: [
        {
          name: "Ajouter",
          inputs: [
            {
              name: "firstName",
              type: "text",
              label: "Prénom",
            },
            {
              name: "lastName",
              type: "text",
              label: "Nom",
            },
            {
              name: "userId",
              type: "select",
              values: "users",
              label: "Utilisateur",
            },
          ],
        },
        {
          name: "Modifier",
          selectionList: true,
          selectionName: "eventId",
          inputs: [
            {
              name: "firstName",
              type: "text",
              label: "Prénom",
            },
            {
              name: "lastName",
              type: "text",
              label: "Nom",
            },
            {
              name: "userId",
              type: "select",
              values: "users",
              label: "Utilisateur",
            },
          ],
        },
        {
          name: "Supprimer",
          selectionList: true,
          selectionName: "eventId",
        },
      ],
    },
    {
      name: "streamer",
      label: "streamers",
      items: [
        {
          name: "Attribuer",
          inputs: [
            {
              name: "twitchUrl",
              type: "text",
              label: "Lien de la chaîne",
            },
          ],
          selectionList: true,
          selectionName: "id",
        },
      ],
    },
    {
      name: "musician",
      label: "chanteurs",
      items: [
        {
          name: "Ajouter",
          inputs: [
            {
              name: "characterId",
              type: "select",
              values: "characters",
              label: "Personnage RP",
            },
            {
              name: "stageName",
              type: "text",
              label: "Nom de scène",
            },
            {
              name: "banner",
              type: "text",
              label: "Lien vers l'image de bannière",
            },
            {
              name: "profilePicture",
              type: "text",
              label: "Lien vers l'image de profil",
            },
            {
              name: "isCertified",
              type: "select",
              values: [
                {
                  label: "Oui",
                  value: true,
                },
                {
                  label: "Non",
                  value: false,
                },
              ],
              label: "Certifié",
            },
            {
              name: "youtubeLink",
              type: "text",
              label: "Lien vers la chaîne YouTube",
            },
          ],
        },
        {
          name: "Modifier",
          selectionList: true,
          selectionName: "musicianId",
          inputs: [
            {
              name: "characterId",
              type: "select",
              values: "characters",
              label: "Personnage RP",
            },
            {
              name: "stageName",
              type: "text",
              label: "Nom de scène",
            },
            {
              name: "banner",
              type: "text",
              label: "Lien vers l'image de bannière",
            },
            {
              name: "profilePicture",
              type: "text",
              label: "Lien vers l'image de profil",
            },
            {
              name: "isCertified",
              type: "select",
              values: [
                {
                  label: "Oui",
                  value: true,
                },
                {
                  label: "Non",
                  value: false,
                },
              ],
              label: "Certifié",
            },
            {
              name: "youtubeLink",
              type: "text",
              label: "Lien vers la chaîne YouTube",
            },
          ],
        },
        {
          name: "Supprimer",
          selectionList: true,
          selectionName: "musicianId",
        },
      ],
    },
    {
      name: "music",
      label: "chansons",
      items: [
        {
          name: "Ajouter",
          inputs: [
            {
              name: "musicianId",
              type: "select",
              values: "musicians",
              label: "Chanteur",
            },
            {
              name: "name",
              type: "text",
              label: "Nom",
            },
            {
              name: "image",
              type: "text",
              label: "Lien vers l'image",
            },
            {
              name: "music",
              type: "file",
              label: "Fichier audio",
            },
          ],
        },
        {
          name: "Modifier",
          selectionList: true,
          selectionName: "musicianId",
          inputs: [
            {
              name: "musicianId",
              type: "select",
              values: "musicians",
              label: "Chanteur",
            },
            {
              name: "name",
              type: "text",
              label: "Nom",
            },
            {
              name: "image",
              type: "text",
              label: "Lien vers l'image",
            },
          ],
        },
        {
          name: "Supprimer",
          selectionList: true,
          selectionName: "musicId",
        },
      ],
    },
    {
      name: "best-of",
      label: "best-of",
      items: [
        {
          name: "Ajouter",
          inputs: [
            {
              name: "index",
              type: "number",
              label: "Numéro",
            },
            {
              name: "url",
              type: "text",
              label: "Lien vers l'image",
            },
          ],
        },
        {
          name: "Modifier",
          selectionList: true,
          selectionName: "patchId",
          inputs: [
            {
              name: "index",
              type: "number",
              label: "Numéro",
            },
            {
              name: "url",
              type: "text",
              label: "Lien vers l'image",
            },
          ],
        },
        {
          name: "Supprimer",
          selectionList: true,
          selectionName: "patchId",
        },
      ],
    },
    {
      name: "panel-element",
      label: "Panel",
      items: [
        {
          name: "Ajouter",
          inputs: [
            {
              name: "category",
              type: "select",
              values: [
                {
                  label: "Services publics",
                  value: "public",
                },
                {
                  label: "Lifeinvader",
                  value: "lifeinvader",
                },
                {
                  label: "Entreprises",
                  value: "company",
                },
              ],
              label: "Catégorie",
            },
            {
              name: "label",
              type: "text",
              label: "Nom",
            },
            {
              name: "image",
              type: "text",
              label: "Lien vers l'image",
            },
            {
              name: "link",
              type: "text",
              label: "Lien vers le site",
            },
            {
              name: "color",
              type: "text",
              label: "Couleur (code hexadécimal)",
            },
          ],
        },
        {
          name: "Modifier",
          selectionList: true,
          selectionName: "panelElementId",
          inputs: [
            {
              name: "category",
              type: "select",
              values: [
                {
                  label: "Services publics",
                  value: "public",
                },
                {
                  label: "Lifeinvader",
                  value: "lifeinvader",
                },
                {
                  label: "Entreprises",
                  value: "company",
                },
              ],
              label: "Catégorie",
            },
            {
              name: "label",
              type: "text",
              label: "Nom",
            },
            {
              name: "image",
              type: "text",
              label: "Lien vers l'image",
            },
            {
              name: "link",
              type: "text",
              label: "Lien vers le site",
            },
            {
              name: "color",
              type: "text",
              label: "Couleur (code hexadécimal)",
            },
          ],
        },
        {
          name: "Supprimer",
          selectionList: true,
          selectionName: "panelElementId",
        },
      ],
    },
    {
      name: "import",
      label: "synchronisation",
      items: [],
    },
    {
      name: "rules",
      label: "règlement WL",
      items: [],
    },
    {
      name: "rules2",
      label: "règlement FA",
      items: [],
    },
  ];

  useEffect(() => {
    if (!rules) return;
    if (!rulesStructure || rulesStructure.length === 0)
      setRulesStructure(rules?.[0] ?? []);
    if (!rulesStructure2 || rulesStructure2.length === 0)
      setRulesStructure2(rules?.[1] ?? []);
  }, [rules]);

  useEffect(() => {
    // ON-NEW-CATEGORY
    const fetchData = async () => {
      if (!currentTab?.name) return;
      if (currentCategory?.name === "event") {
        const response = await loggedApi.get("/event/get-all");
        setEvents(response.data.data.event);
      }
      if (currentCategory?.name === "patch") {
        const response = await loggedApi.get("/patch-note/get-all");
        setPatchs(response.data.data.patchNotes);
      }
      if (
        currentCategory?.name === "character" ||
        currentCategory?.name === "news" ||
        currentCategory?.name === "cayo-news" ||
        currentCategory?.name === "musician"
      ) {
        const response = await loggedApi.get("/character/get-all");
        setCharacters(response.data.data.characters);
      }
      if (currentCategory?.name === "news") {
        const response = await loggedApi.get("/news/get-all");
        setNews(response.data.data.news);
      }
      if (currentCategory?.name === "cayo-news") {
        const response = await loggedApi.get("/cayo-news/get-all");
        setCayoNews(response.data.data.news);
      }
      if (
        currentCategory?.name === "musician" ||
        currentCategory?.name === "music"
      ) {
        const response = await loggedApi.get("/musician/get-all");
        setMusicians(response.data.data.musicians);
      }
      if (currentCategory?.name === "music") {
        const response = await loggedApi.get("/music/get-all");
        setMusics(response.data.data.musics);
      }
      if (currentCategory?.name === "best-of") {
        const response = await loggedApi.get("/best-of/get-all");
        setBestOfs(response.data.data.bestOfs);
      }
    };

    fetchData().catch((e) => {
      enqueueSnackbar(
        e?.response?.data?.error?.message ??
          e?.response?.data?.error?.code ??
          "Une erreur inconnue est survenue"
      );
    });
  }, [currentTab]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await loggedApi.get("/user/all");
      setUsers(response.data.users);
    };
    fetchData().catch((e) => {
      enqueueSnackbar(
        e?.response?.data?.error?.message ??
          e?.response?.data?.error?.code ??
          "Une erreur inconnue est survenue"
      );
    });
    console.log(rules);

    if (!rulesStructure) {
      setRulesStructure(rules?.[0] ?? []);
    }
    if (!rulesStructure2) {
      setRulesStructure2(rules?.[1] ?? []);
    }
  }, []);

  useEffect(() => {
    setCurrentTab(currentCategory?.items?.[0] ?? null);
  }, [currentCategory]);

  useEffect(() => {
    setModifSelection(null);
    if (!currentTab) {
      setData({});
    } else {
      const a = {};
      (currentTab?.inputs ?? []).forEach((e) => {
        if (e.type === "datetime") {
          a[e.name] = dayjs();
        }
      });
      setData(a);
    }
  }, [currentCategory, currentTab]);

  // ON-NEW-CATEGORY

  const handleChange = (type, name, value, isModif = false) => {
    if (isModif) {
      if (!value) return;
      setModifSelection(value);
      if (currentCategory?.name === "event") {
        const a = events.find((e) => e.id === value);
        a.date = dayjs(a.date);
        setData(a);
      }
      if (currentCategory?.name === "patch") {
        const a = patchs.find((e) => e.id === value);
        a.date = dayjs(a.date);
        setData(a);
      }
      if (currentCategory?.name === "character") {
        const a = characters.find((e) => e.id === value);
        setData(a);
      }
      if (currentCategory?.name === "news") {
        const a = news.find((e) => e.id === value);
        a.date = dayjs(a.date);
        setData(a);
      }
      if (currentCategory?.name === "cayo-news") {
        const a = news.find((e) => e.id === value);
        a.date = dayjs(a.date);
        setData(a);
      }
      if (currentCategory?.name === "streamer") {
        const a = users.find((e) => e.id === value);
        setData(a);
      }
      if (currentCategory?.name === "musician") {
        const a = musicians.find((e) => e.id === value);
        setData(a);
      }
      if (currentCategory?.name === "music") {
        const a = musics.find((e) => e.id === value);
        setData(a);
      }
      if (currentCategory?.name === "best-of") {
        const a = bestOfs.find((e) => e.id === value);
        setData(a);
      }
      if (currentCategory?.name === "panel-element") {
        const a = panelElements.find((e) => e.id === value);
        setData(a);
      }
      return;
    }
    if (type === "datetime") value = value.format();
    const _data = { ...data };
    _data[name] = value;
    setData(_data);
  };

  // ON-NEW-CATEGORY

  const submit = async () => {
    try {
      if (currentCategory.name === "event") {
        switch (currentTab.name) {
          case "Ajouter": {
            await loggedApi.post("/event/create", { ...data });
            enqueueSnackbar("Event créé");
            break;
          }
          case "Modifier": {
            const a = { ...data };
            delete a.createdAt;
            delete a.updatedAt;
            await loggedApi.post("/event/update", a);
            enqueueSnackbar("Event modifié");
            break;
          }
          case "Supprimer": {
            await loggedApi.delete("/event/delete?id=" + data.id);
            enqueueSnackbar("Event supprimé");
            break;
          }
        }
      }
      if (currentCategory.name === "patch") {
        switch (currentTab.name) {
          case "Ajouter": {
            await loggedApi.post("/patch-note/create", { ...data });
            enqueueSnackbar("Patch créé");
            break;
          }
          case "Modifier": {
            const a = { ...data };
            delete a.createdAt;
            delete a.updatedAt;
            await loggedApi.post("/patch-note/update", a);
            enqueueSnackbar("Patch modifié");
            break;
          }
          case "Supprimer": {
            await loggedApi.delete("/patch-note/delete?id=" + data.id);
            enqueueSnackbar("Patch supprimé");
            break;
          }
        }
      }
      if (currentCategory.name === "character") {
        switch (currentTab.name) {
          case "Ajouter": {
            await loggedApi.post("/character/create", { ...data });
            enqueueSnackbar("Personnage créé");
            break;
          }
          case "Modifier": {
            const a = { ...data };
            delete a.createdAt;
            delete a.updatedAt;
            await loggedApi.post("/character/update", a);
            enqueueSnackbar("Personnage modifié");
            break;
          }
          case "Supprimer": {
            await loggedApi.delete("/character/delete?id=" + data.id);
            enqueueSnackbar("Personnage supprimé");
            break;
          }
        }
      }
      if (currentCategory.name === "news") {
        switch (currentTab.name) {
          case "Ajouter": {
            await loggedApi.post("/news/create", { ...data });
            enqueueSnackbar("News créé");
            break;
          }
          case "Modifier": {
            const a = { ...data };
            delete a.createdAt;
            delete a.updatedAt;
            if (a.content === "") delete a.content;
            await loggedApi.post("/news/update", a);
            enqueueSnackbar("News modifié");
            break;
          }
          case "Supprimer": {
            await loggedApi.delete("/news/delete?id=" + data.id);
            enqueueSnackbar("News supprimé");
            break;
          }
        }
      }
      if (currentCategory.name === "cayo-news") {
        switch (currentTab.name) {
          case "Ajouter": {
            await loggedApi.post("/cayo-news/create", { ...data });
            enqueueSnackbar("News créé");
            break;
          }
          case "Modifier": {
            const a = { ...data };
            delete a.createdAt;
            delete a.updatedAt;
            if (a.content === "") delete a.content;
            await loggedApi.post("/cayo-news/update", a);
            enqueueSnackbar("News modifié");
            break;
          }
          case "Supprimer": {
            await loggedApi.delete("/cayo-news/delete?id=" + data.id);
            enqueueSnackbar("News supprimé");
            break;
          }
        }
      }
      if (currentCategory.name === "panel-element") {
        switch (currentTab.name) {
          case "Ajouter": {
            await loggedApi.post("/panel-element/create", { ...data });
            enqueueSnackbar("Élément créé");
            break;
          }
          case "Modifier": {
            const a = { ...data };
            delete a.createdAt;
            delete a.updatedAt;
            if (a.content === "") delete a.content;
            await loggedApi.post("/panel-element/update", a);
            enqueueSnackbar("Élément modifié");
            break;
          }
          case "Supprimer": {
            await loggedApi.delete("/panel-element/delete?id=" + data.id);
            enqueueSnackbar("Élément supprimé");
            break;
          }
        }
      }
      if (currentCategory.name === "musician") {
        switch (currentTab.name) {
          case "Ajouter": {
            await loggedApi.post("/musician/create", { ...data });
            enqueueSnackbar("Musicien créé");
            break;
          }
          case "Modifier": {
            const a = { ...data };
            delete a.createdAt;
            delete a.updatedAt;
            await loggedApi.post("/musician/update", a);
            enqueueSnackbar("Musicien modifié");
            break;
          }
          case "Supprimer": {
            await loggedApi.delete("/musician/delete?id=" + data.id);
            enqueueSnackbar("Musicien supprimé");
            break;
          }
        }
      }
      if (currentCategory.name === "streamer") {
        switch (currentTab.name) {
          case "Attribuer": {
            await loggedApi.post("/user", {
              id: data.id,
              twitchUrl: data.twitchUrl,
            });
            enqueueSnackbar("Utilisateur mis à jour");
            break;
          }
        }
      }
      if (currentCategory.name === "music") {
        switch (currentTab.name) {
          case "Ajouter": {
            if (!file) {
              enqueueSnackbar("Il n'y a pas de fichier");
              return;
            }
            const response = await loggedApi.post("/music/create", { ...data });

            const formData = new FormData();
            formData.append("music", file);
            // 👇 Uploading the file using the fetch API to the server
            await loggedApi.post(response.data.data.uploadPath, formData, {
              // 👇 Set headers manually for single file upload
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            enqueueSnackbar("Musique créée");
            break;
          }
          case "Modifier": {
            const a = {
              musicianId: data.musicianId,
              name: data.name,
              image: data.image,
              id: data.id,
            };
            await loggedApi.post("/music/update", a);
            enqueueSnackbar("Musique modifiée");
            break;
          }
          case "Supprimer": {
            await loggedApi.delete("/music/delete?id=" + data.id);
            enqueueSnackbar("Musique supprimée");
            break;
          }
        }
      }
      if (currentCategory.name === "best-of") {
        switch (currentTab.name) {
          case "Ajouter": {
            await loggedApi.post("/best-of/create", { ...data });
            enqueueSnackbar("Best of créé");
            break;
          }
          case "Modifier": {
            const a = { ...data };
            delete a.createdAt;
            delete a.updatedAt;
            await loggedApi.post("/best-of/update", a);
            enqueueSnackbar("Best of modifié");
            break;
          }
          case "Supprimer": {
            await loggedApi.delete("/best-of/delete?id=" + data.id);
            enqueueSnackbar("Best of supprimé");
            break;
          }
        }
      }
    } catch (e) {
      enqueueSnackbar(
        e?.response?.data?.error?.message ??
          e?.response?.data?.error?.code ??
          "Une erreur inconnue est survenue"
      );
    }
  };

  const onFileChange = (e: any) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <HeaderAndFooterLayout>
      <div className="adminPage">
        <div className="main">
          <div className="categories">
            {adminConfig.map((category) => (
              <div
                key={category.name}
                className={
                  "category" +
                  (currentCategory?.name === category.name ? " selected" : "")
                }
                onClick={() => {
                  setCurrentCategory(category);
                }}
              >
                <span>{category.label}</span>
              </div>
            ))}
          </div>
          <div className="current">
            {currentCategory?.name === "import" && (
              <div
                style={{
                  marginTop: 20,
                  pointerEvents: disabled ? "none" : "all",
                }}
                className="adminButton"
                onClick={async () => {
                  try {
                    setDisabled(true);
                    await loggedApi.post("/user/sync");
                    enqueueSnackbar(
                      "Les utilisateurs ont été synchronisés avec Discord"
                    );
                    setDisabled(false);
                  } catch (e) {
                    enqueueSnackbar(
                      e?.response?.data?.error?.message ??
                        e?.response?.data?.error?.code ??
                        "Une erreur inconnue est survenue"
                    );
                    setDisabled(false);
                  }
                }}
              >
                Synchroniser avec discord
              </div>
            )}
            {currentCategory?.name === "rules" && (
              <div className="Rules">
                <div
                  style={{
                    marginTop: 20,
                    pointerEvents: disabled ? "none" : "all",
                  }}
                  className="adminButton"
                  onClick={() => {
                    try {
                      setDisabled(true);
                      const a = [...rulesStructure];
                      a.forEach((cat) => {
                        cat.items.forEach((subcat) => {
                          subcat.items =
                            subcat?.items?.filter(
                              (text) => text?.value !== ""
                            ) ?? [];
                        });
                        cat.items = cat.items.filter(
                          (subcat) =>
                            (subcat.type === "sub" &&
                              (subcat.items.length > 0 ||
                                (subcat?.image ?? "") !== "")) ||
                            (subcat?.value ?? "") !== ""
                        );
                      });
                      const data = {
                        rulesData: [
                          ...a.filter(
                            (cat) => cat.items.length > 0 || cat.image !== ""
                          ),
                        ],
                        serverType: 0,
                      };
                      loggedApi.post("/rules", data);
                      setRulesStructure(
                        a.filter(
                          (cat) => cat.items.length > 0 || cat.image !== ""
                        )
                      );
                      enqueueSnackbar("Le règlement a été mis à jour.");
                      setDisabled(false);
                    } catch (e) {
                      enqueueSnackbar(
                        e?.response?.data?.error?.message ??
                          e?.response?.data?.error?.code ??
                          "Une erreur inconnue est survenue"
                      );
                      setDisabled(false);
                    }
                  }}
                >
                  SAUVEGARDER
                </div>
                {rulesStructure?.map((e, index) => (
                  <div className="RulesContainer" key={"maincontainer" + index}>
                    <img src={rulesStructure[index].image} />
                    <div className="adminLabel">Lien vers l'image</div>
                    <div className="adminText">
                      <input
                        value={rulesStructure[index].image ?? ""}
                        onChange={(e) => {
                          const a = [...rulesStructure];
                          a[index].image = e.currentTarget.value;
                          setRulesStructure(a);
                        }}
                      />
                    </div>

                    {e.items.map((f, _index) => {
                      if (f.type === "text") {
                        return (
                          <textarea
                            key={`${index}-${_index}`}
                            value={
                              rulesStructure[index].items[_index].value ?? ""
                            }
                            onChange={(e) => {
                              const a = [...rulesStructure];
                              a[index].items[_index].value =
                                e.currentTarget.value;
                              setRulesStructure(a);
                            }}
                          />
                        );
                      }

                      if (f.type === "sub") {
                        return (
                          <div
                            className="RulesSubContainer"
                            key={"subcontainer" + index + _index}
                          >
                            <img
                              src={rulesStructure[index].items[_index].image}
                            />
                            <div className="adminLabel">Lien vers l'image</div>
                            <div className="adminText">
                              <input
                                value={
                                  rulesStructure[index].items[_index].image ??
                                  ""
                                }
                                onChange={(e) => {
                                  const a = [...rulesStructure];
                                  a[index].items[_index].image =
                                    e.currentTarget.value;
                                  setRulesStructure(a);
                                }}
                              />
                            </div>

                            {f.items.map((f, __index) => {
                              if (f.type === "text") {
                                return (
                                  <textarea
                                    key={`${index}-${_index}-${__index}`}
                                    value={
                                      rulesStructure[index].items[_index]
                                        ?.items[__index]?.value ?? ""
                                    }
                                    onChange={(e) => {
                                      const a = [...rulesStructure];
                                      a[index].items[_index].items[
                                        __index
                                      ].value = e.currentTarget.value;
                                      setRulesStructure(a);
                                    }}
                                  />
                                );
                              }
                            })}

                            <div className="RulesButtonContainer">
                              <div
                                className="Main RulesButton"
                                onClick={() => {
                                  const a = [...rulesStructure];
                                  a[index].items[_index].items = [
                                    ...rulesStructure[index].items[_index]
                                      .items,
                                    { type: "text", value: "" },
                                  ];
                                  setRulesStructure(a);
                                }}
                              >
                                <span>Ajouter un paragraphe</span>
                                <Add />
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}

                    <div className="RulesButtonContainer">
                      <div
                        className="Main RulesButton"
                        onClick={() => {
                          const a = [...rulesStructure];
                          a[index].items = [
                            ...rulesStructure[index].items,
                            { type: "text", value: "" },
                          ];
                          setRulesStructure(a);
                        }}
                      >
                        <span>Ajouter un paragraphe</span>
                        <Add />
                      </div>
                      <div
                        className="Main RulesButton"
                        onClick={() => {
                          const a = [...rulesStructure];
                          a[index].items = [
                            ...rulesStructure[index].items,
                            { type: "sub", items: [] },
                          ];
                          setRulesStructure(a);
                        }}
                      >
                        <span>Ajouter une sous-partie</span>
                        <Add />
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className="Main RulesButton"
                  onClick={() => {
                    setRulesStructure([
                      ...rulesStructure,
                      { image: "", items: [] },
                    ]);
                  }}
                >
                  <span>Ajouter une partie</span>
                  <Add />
                </div>
              </div>
            )}
            {currentCategory?.name === "rules2" && (
              <div className="Rules">
                <div
                  style={{
                    marginTop: 20,
                    pointerEvents: disabled ? "none" : "all",
                  }}
                  className="adminButton"
                  onClick={() => {
                    try {
                      setDisabled(true);
                      const a = [...rulesStructure2];
                      a.forEach((cat) => {
                        cat.items.forEach((subcat) => {
                          subcat.items =
                            subcat?.items?.filter(
                              (text) => text?.value !== ""
                            ) ?? [];
                        });
                        cat.items = cat.items.filter(
                          (subcat) =>
                            (subcat.type === "sub" &&
                              (subcat.items.length > 0 ||
                                (subcat?.image ?? "") !== "")) ||
                            (subcat?.value ?? "") !== ""
                        );
                      });
                      const data = {
                        rulesData: [
                          ...a.filter(
                            (cat) => cat.items.length > 0 || cat.image !== ""
                          ),
                        ],
                        serverType: 1,
                      };
                      loggedApi.post("/rules", data);
                      setRulesStructure2(
                        a.filter(
                          (cat) => cat.items.length > 0 || cat.image !== ""
                        )
                      );
                      enqueueSnackbar("Le règlement a été mis à jour.");
                      setDisabled(false);
                    } catch (e) {
                      enqueueSnackbar(
                        e?.response?.data?.error?.message ??
                          e?.response?.data?.error?.code ??
                          "Une erreur inconnue est survenue"
                      );
                      setDisabled(false);
                    }
                  }}
                >
                  SAUVEGARDER
                </div>
                {rulesStructure2?.map((e, index) => (
                  <div className="RulesContainer" key={"maincontainer" + index}>
                    <img src={rulesStructure2[index].image} />
                    <div className="adminLabel">Lien vers l'image</div>
                    <div className="adminText">
                      <input
                        value={rulesStructure2[index].image ?? ""}
                        onChange={(e) => {
                          const a = [...rulesStructure2];
                          a[index].image = e.currentTarget.value;
                          setRulesStructure2(a);
                        }}
                      />
                    </div>

                    {e.items.map((f, _index) => {
                      if (f.type === "text") {
                        return (
                          <textarea
                            key={`${index}-${_index}`}
                            value={
                              rulesStructure2[index].items[_index].value ?? ""
                            }
                            onChange={(e) => {
                              const a = [...rulesStructure2];
                              a[index].items[_index].value =
                                e.currentTarget.value;
                              setRulesStructure2(a);
                            }}
                          />
                        );
                      }

                      if (f.type === "sub") {
                        return (
                          <div
                            className="RulesSubContainer"
                            key={"subcontainer" + index + _index}
                          >
                            <img
                              src={rulesStructure2[index].items[_index].image}
                            />
                            <div className="adminLabel">Lien vers l'image</div>
                            <div className="adminText">
                              <input
                                value={
                                  rulesStructure2[index].items[_index].image ??
                                  ""
                                }
                                onChange={(e) => {
                                  const a = [...rulesStructure2];
                                  a[index].items[_index].image =
                                    e.currentTarget.value;
                                  setRulesStructure2(a);
                                }}
                              />
                            </div>

                            {f.items.map((f, __index) => {
                              if (f.type === "text") {
                                return (
                                  <textarea
                                    key={`${index}-${_index}-${__index}`}
                                    value={
                                      rulesStructure2[index].items[_index]
                                        ?.items[__index]?.value ?? ""
                                    }
                                    onChange={(e) => {
                                      const a = [...rulesStructure2];
                                      a[index].items[_index].items[
                                        __index
                                      ].value = e.currentTarget.value;
                                      setRulesStructure2(a);
                                    }}
                                  />
                                );
                              }
                            })}

                            <div className="RulesButtonContainer">
                              <div
                                className="Main RulesButton"
                                onClick={() => {
                                  const a = [...rulesStructure2];
                                  a[index].items[_index].items = [
                                    ...rulesStructure2[index].items[_index]
                                      .items,
                                    { type: "text", value: "" },
                                  ];
                                  setRulesStructure2(a);
                                }}
                              >
                                <span>Ajouter un paragraphe</span>
                                <Add />
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}

                    <div className="RulesButtonContainer">
                      <div
                        className="Main RulesButton"
                        onClick={() => {
                          const a = [...rulesStructure2];
                          a[index].items = [
                            ...rulesStructure2[index].items,
                            { type: "text", value: "" },
                          ];
                          setRulesStructure2(a);
                        }}
                      >
                        <span>Ajouter un paragraphe</span>
                        <Add />
                      </div>
                      <div
                        className="Main RulesButton"
                        onClick={() => {
                          const a = [...rulesStructure2];
                          a[index].items = [
                            ...rulesStructure2[index].items,
                            { type: "sub", items: [] },
                          ];
                          setRulesStructure2(a);
                        }}
                      >
                        <span>Ajouter une sous-partie</span>
                        <Add />
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  className="Main RulesButton"
                  onClick={() => {
                    setRulesStructure2([
                      ...rulesStructure2,
                      { image: "", items: [] },
                    ]);
                  }}
                >
                  <span>Ajouter une partie</span>
                  <Add />
                </div>
              </div>
            )}

            <div className="tabs">
              {currentCategory?.items.map((tab) => (
                <div
                  key={tab.name}
                  className={
                    "tab" + (currentTab?.name === tab.name ? " selected" : "")
                  }
                  onClick={() => setCurrentTab(tab)}
                >
                  <span>{tab.name}</span>
                </div>
              ))}
            </div>
            <div className="inputs">
              {currentTab?.selectionList && (
                <div className="adminSelect">
                  <div className="adminLabel">Valeur à modifier</div>
                  <Autocomplete
                    value={modifSelection || null}
                    onChange={(e, value: any) =>
                      handleChange(
                        null,
                        currentTab?.selectionName,
                        value.id,
                        true
                      )
                    }
                    options={(() => {
                      if (currentCategory?.name === "event") return events;
                      if (currentCategory?.name === "patch") return patchs;
                      if (currentCategory?.name === "character")
                        return characters;
                      if (currentCategory?.name === "news") return news;
                      if (currentCategory?.name === "cayo-news")
                        return cayonews;
                      if (currentCategory?.name === "streamer") return users;
                      if (currentCategory?.name === "musician")
                        return musicians;
                      if (currentCategory?.name === "music") return musics;
                      if (currentCategory?.name === "best-of") return bestOfs;
                      if (currentCategory?.name === "panel-element")
                        return panelElements;
                    })()}
                    renderInput={(params) => <TextField {...params} />}
                    getOptionLabel={(e: any) => {
                      if (currentCategory?.name === "event") {
                        if (typeof e === "string")
                          e = events.find((f) => f.id === e);
                        return `${e?.title} - ${e?.place}`;
                      }
                      if (currentCategory?.name === "patch") {
                        if (typeof e === "string")
                          e = patchs.find((f) => f.id === e);
                        return `${dayjs(e?.date).format("DD/MM/YYYY")}`;
                      }
                      if (currentCategory?.name === "character") {
                        if (typeof e === "string")
                          e = characters.find((f) => f.id === e);
                        return `${e?.firstName} ${e?.lastName}`;
                      }
                      if (currentCategory?.name === "news") {
                        if (typeof e === "string")
                          e = news.find((f) => f.id === e);
                        return `${e?.serverType === 0 ? "[WL] " : "[FA] "}${
                          e?.type
                        } - ${e?.title}`;
                      }
                      if (currentCategory?.name === "cayo-news") {
                        if (typeof e === "string")
                          e = news.find((f) => f.id === e);
                        return `${e?.serverType === 0 ? "[WL] " : "[FA] "}${
                          e?.type
                        } - ${e?.title}`;
                      }
                      if (currentCategory?.name === "panel-element") {
                        if (typeof e === "string")
                          e = panelElements.find((f) => f.id === e);
                        return `${e?.category} - ${e?.label}`;
                      }
                      if (currentCategory?.name === "streamer") {
                        if (typeof e === "string")
                          e = users.find((f) => f.id === e);
                        return `${e?.discordName} ${
                          e?.twitchName ? " - " + e.twitchName : ""
                        }`;
                      }
                      if (currentCategory?.name === "musician") {
                        if (typeof e === "string")
                          e = musicians.find((f) => f.id === e);
                        return `${e?.stageName}`;
                      }
                      if (currentCategory?.name === "music") {
                        if (typeof e === "string")
                          e = musics.find((f) => f.id === e);
                        return `${e?.musician?.stageName} - ${e?.name}`;
                      }
                      if (currentCategory?.name === "best-of") {
                        if (typeof e === "string")
                          e = bestOfs.find((f) => f.id === e);
                        return `Best of #${e?.index}`;
                      }
                    }}
                    isOptionEqualToValue={(option: any, value: any) => {
                      return option.id === value;
                    }}
                  />
                </div>
              )}
              {currentTab?.inputs?.map((input) => {
                return (
                  <React.Fragment key={input.name}>
                    {(() => {
                      if (input.type === "text") {
                        return (
                          <div className="adminText">
                            <div className="adminLabel">
                              {input.label}{" "}
                              {input?.tooltip ? (
                                <div className="adminTooltip">
                                  <Tooltip title={input.tooltip}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#ffffff"
                                      stroke-width="3"
                                      stroke-linecap="square"
                                      stroke-linejoin="arcs"
                                    >
                                      <circle cx="12" cy="12" r="10" />
                                      <line
                                        x1="12"
                                        y1="8"
                                        x2="12"
                                        y2="12"
                                      ></line>
                                      <line
                                        x1="12"
                                        y1="16"
                                        x2="12.01"
                                        y2="16"
                                      />
                                    </svg>
                                  </Tooltip>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                            <input
                              value={data[input.name] ?? ""}
                              onChange={(e) => {
                                handleChange(
                                  input.type,
                                  input.name,
                                  e.currentTarget.value
                                );
                              }}
                            />
                          </div>
                        );
                      }
                      if (input.type === "number") {
                        return (
                          <>
                            <div className="adminLabel">{input.label}</div>
                            <TextField
                              type="number"
                              InputLabelProps={{ shrink: true }}
                              value={data[input.name] ?? ""}
                              onChange={(e) => {
                                handleChange(
                                  input.type,
                                  input.name,
                                  e.currentTarget.value
                                );
                              }}
                            />
                          </>
                        );
                      }
                      if (input.type === "datetime") {
                        return (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                              components={["MobileDateTimePicker"]}
                            >
                              <DemoItem label={input.label}>
                                <MobileDateTimePicker
                                  value={dayjs(data[input.name]) ?? ""}
                                  onChange={(e) => {
                                    handleChange(input.type, input.name, e);
                                  }}
                                />
                              </DemoItem>
                            </DemoContainer>
                          </LocalizationProvider>
                        );
                      }
                      if (input.type === "select") {
                        return (
                          <div className="adminSelect">
                            <div className="adminLabel">{input.label}</div>
                            <Autocomplete
                              value={data[input.name] ?? null}
                              options={(() => {
                                if (typeof input.values !== "string")
                                  return input.values;
                                if (input.values === "users") return users;
                                if (input.values === "characters")
                                  return characters;
                                if (input.values === "musicians")
                                  return musicians;
                              })()}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              getOptionLabel={(e: any) => {
                                let label;
                                if (typeof input.values !== "string")
                                  label = e?.label ?? e;
                                if (input.values === "users")
                                  label =
                                    e?.discordName ??
                                    users.find((f) => f.id === e)?.discordName;
                                if (input.values === "characters")
                                  label = e?.firstName
                                    ? e.firstName + " " + e.lastName
                                    : characters.find((f) => f.id === e)
                                        ?.firstName +
                                      " " +
                                      characters.find((f) => f.id === e)
                                        ?.lastName;
                                if (input.values === "musicians")
                                  label =
                                    e.stageName ??
                                    musicians.find((f) => f.id === e)
                                      ?.stageName;
                                if (typeof label === "number") {
                                  label =
                                    input.values.find((f) => f.value === label)
                                      ?.label ?? label;
                                }
                                return label;
                              }}
                              isOptionEqualToValue={(
                                _option: any,
                                value: any
                              ) => {
                                let option;
                                if (typeof input.values !== "string") {
                                  option = _option?.value ?? _option;
                                }
                                if (
                                  input?.values === "users" ||
                                  input?.values === "characters" ||
                                  input?.values === "musicians"
                                ) {
                                  option = _option.id;
                                }
                                return option === value;
                              }}
                              onChange={(e, _value) => {
                                let value;
                                if (typeof input.values !== "string") {
                                  value = _value?.value ?? _value;
                                }
                                if (
                                  input?.values === "users" ||
                                  input?.values === "characters" ||
                                  input?.values === "musicians"
                                ) {
                                  value = _value.id;
                                }
                                handleChange(input.type, input.name, value);
                              }}
                            />
                          </div>
                        );
                      }
                      if (
                        input.type === "textarea" &&
                        (currentCategory !== "news" ||
                          currentCategory !== "cayo-news" ||
                          data["type"] === 1)
                      ) {
                        return (
                          <React.Fragment>
                            <div className="adminLabel">{input.label}</div>
                            <textarea
                              value={data[input.name] ?? ""}
                              onChange={(e) => {
                                handleChange(
                                  input.type,
                                  input.name,
                                  e.target.value
                                );
                              }}
                            />
                          </React.Fragment>
                        );
                      }
                      if (input.type === "file") {
                        return (
                          <React.Fragment>
                            <div className="adminLabel">{input.label}</div>
                            <label
                              className="adminButton"
                              htmlFor="inputSong"
                              style={{
                                background:
                                  "linear-gradient(180deg, #F8B127 0%, #753D00 100%)",
                              }}
                            >
                              {file?.name ?? "Aucun fichier"}
                              <input
                                id="inputSong"
                                type="file"
                                accept="audio/*"
                                onChange={onFileChange}
                                hidden
                              />
                            </label>
                          </React.Fragment>
                        );
                      }
                    })()}
                  </React.Fragment>
                );
              })}

              {currentTab && (
                <div className="adminButton" onClick={() => submit()}>
                  {currentTab.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </HeaderAndFooterLayout>
  );
};
