from repositories.student_repository import StudentRepository
import requests

class StudentService:
    BASE_URL = "http://127.0.0.1:5000/tables"

    @staticmethod
    def get_all_students():
        """
        Récupère les données des étudiants en utilisant les données de chaque table
        et les structure en un format `schoolData`.
        """
        # Récupérer toutes les tables nécessaires
        student_data = requests.get(f"{StudentService.BASE_URL}/student_kaggle").json()['student_kaggle']
        student_family_data = requests.get(f"{StudentService.BASE_URL}/student_family").json()['student_family']
        performance_data = requests.get(f"{StudentService.BASE_URL}/performance").json()['performance']
        study_habits_data = requests.get(f"{StudentService.BASE_URL}/study_habits").json()['study_habits']
        support_data = requests.get(f"{StudentService.BASE_URL}/support").json()['support']
        social_life_data = requests.get(f"{StudentService.BASE_URL}/social_life").json()['social_life']
        health_data = requests.get(f"{StudentService.BASE_URL}/health").json()['health']
        parent_job_data = requests.get(f"{StudentService.BASE_URL}/parent_job").json()['parent_job']
        parent_edu_data = requests.get(f"{StudentService.BASE_URL}/parent_education").json()['parent_education']
        reasons_data = requests.get(f"{StudentService.BASE_URL}/reason").json()['reason']
        travel_time_data = requests.get(f"{StudentService.BASE_URL}/travel_time").json()['travel_time']
        studytime_data = requests.get(f"{StudentService.BASE_URL}/studytime").json()['studytime']
        guardian_data = requests.get(f"{StudentService.BASE_URL}/guardian").json()['guardian']

        # Construire les données formatées
        result = []
        for student in student_data:
            student_family = next(f for f in student_family_data if f["student_family_id"] == student["student_family_id"])
            performance = next(p for p in performance_data if p["performance_id"] == student["performance_id"])
            study_habits = next(s for s in study_habits_data if s["study_habits_id"] == student["study_habits_id"])
            support = next(sup for sup in support_data if sup["support_id"] == student["support_id"])
            social_life = next(soc for soc in social_life_data if soc["social_life_id"] == student["social_life_id"])
            health = next(h for h in health_data if h["health_id"] == student["health_id"])
            result.append({
                "school": student["school"],
                "sex": student["sex"],
                "age": student["age"],
                "address": student["address"],
                "famsize": student_family["famsize"],
                "Pstatus": student_family["Pstatus"],
                "Medu": next(e["parent_edu_level"] for e in parent_edu_data if e["parent_edu_id"] == student_family["mother_edu_id"]),
                "Fedu": next(e["parent_edu_level"] for e in parent_edu_data if e["parent_edu_id"] == student_family["father_edu_id"]),
                "Mjob": next(j["job_name"] for j in parent_job_data if j["job_id"] == student_family["mother_job_id"]),
                "Fjob": next(j["job_name"] for j in parent_job_data if j["job_id"] == student_family["father_job_id"]),
                 "reason": next(r["reason"] for r in reasons_data if r["reason_id"] == support["reason_id"]),
                "guardian": next(g["guardian_name"] for g in guardian_data if g["guardian_id"] == student_family["guardian_id"]),
                "traveltime": next(t["travel_time_range"] for t in travel_time_data if t["travel_id"] == study_habits["travel_id"]),
                "studytime": next(s["studytime_range"] for s in studytime_data if s["studytime_id"] == study_habits["studytime_id"]),
                "failures_por": performance["failures_por"],
                "failures_math": performance["failures_math"],
                "schoolsup": "yes" if support["schoolsup"] else "no",
                "famsup": "yes" if support["famsup"] else "no",
                "paid_math": "yes" if support["paid_math"] else "no",
                "paid_por": "yes" if support["paid_por"] else "no",
                "activities": "yes" if social_life["activities"] else "no",
                "nursery": "yes" if support["nursery"] else "no",
                "higher": "yes" if support["higher"] else "no",
                "internet": "yes" if support["internet"] else "no",
                "romantic": "yes" if social_life["romantic"] else "no",
                "famrel": social_life["famrel"],
                "freetime": social_life["freetime"],
                "goout": social_life["goout"],
                "Dalc": health["Dalc"],
                "Walc": health["Walc"],
                "health": health["health"],
                "absences_por": study_habits["absences_por"],
                "absences_math": study_habits["absences_math"],
                "G1_por": performance["G1_por"],
                "G2_por": performance["G2_por"],
                "G3_por": performance["G3_por"],
                "G1_math": performance.get("G1_math", None),  # Utilisation de `.get()` pour éviter les erreurs si la colonne n'existe pas
                "G2_math": performance.get("G2_math", None),
                "G3_math": performance.get("G3_math", None),
            })

        return result