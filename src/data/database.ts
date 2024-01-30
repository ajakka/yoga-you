import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATA, TABLES } from "./queries";
import { PoseType } from "../models/PoseType";
import { Exercise } from "../models/Exercise";

const db = SQLite.openDatabase("yoga.db");

export async function initYogaDB() {
  const isDbPopulated = await AsyncStorage.getItem("@yogayou/db_populated");
  if (isDbPopulated == undefined) {
    db.transaction((tx) => {
      for (let index = 0; index < TABLES.length; index++) {
        const table = TABLES[index];
        tx.executeSql(table);
      }

      for (let index = 0; index < DATA.length; index++) {
        const data = DATA[index];
        tx.executeSql(data);
      }
    });

    await AsyncStorage.setItem("@yogayou/db_populated", "true");
  }
}

export async function getYogaPoses() {
  return new Promise<PoseType[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT 
            p.id,
            p.english_name,
            p.sanskrit_name_adapted,
            p.sanskrit_name,
            p.translation_name,
            p.pose_description,
            p.pose_benefits,
            p.url_svg,
            p.url_png,
            p.url_svg_alt,
            d.difficulty_level
          FROM poses p
          JOIN transitive_poses tp ON p.id = tp.pose_id
          JOIN difficulty d ON tp.difficulty_id = d.id
          GROUP BY p.id`,
          [],
          (tr, result) => {
            resolve(result.rows._array);
          },
          (tr, error) => {
            reject(error);
            return true;
          }
        );
      },
      (error) => console.log(error)
      // () => console.log("success!!")
    );
  });
}

export async function getYogaPosesByID(ids: number[]) {
  return new Promise<PoseType[]>((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT 
            p.id,
            p.english_name,
            p.sanskrit_name_adapted,
            p.sanskrit_name,
            p.translation_name,
            p.pose_description,
            p.pose_benefits,
            p.url_svg,
            p.url_png,
            p.url_svg_alt,
            d.difficulty_level
          FROM poses p
          JOIN transitive_poses tp ON p.id = tp.pose_id
          JOIN difficulty d ON tp.difficulty_id = d.id
          WHERE p.id IN (${ids.join(", ")})
          GROUP BY p.id`,
          [],
          (tr, result) => {
            resolve(result.rows._array);
          },
          (tr, error) => {
            reject(error);
            return true;
          }
        );
      },
      (error) => console.log(error)
      // () => console.log("success!!")
    );
  });
}

export async function getYogaExercises() {
  const exercises = await AsyncStorage.getItem("exercises");

  if (exercises !== null) {
    const parsed = JSON.parse(exercises) as Exercise[];
    return parsed;
  } else {
    return [] as Exercise[];
  }
}

export async function setYogaExercises(data: Exercise[]) {
  await AsyncStorage.setItem("exercises", JSON.stringify(data));
}
