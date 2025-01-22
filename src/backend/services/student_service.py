from repositories.student_repository import StudentRepository
import requests

class StudentService:
    BASE_URL = "http://127.0.0.1:5000/tables2"

    @staticmethod
    def get_all_students():
        """
        Récupère les données des étudiants en utilisant les données de chaque table
        et les structure en un format `schoolData`.
        """
        # Charger toutes les données nécessaires
        data = {
            "students": requests.get(f"{StudentService.BASE_URL}/student_kaggle").json()['student_kaggle'],
            "student_families": requests.get(f"{StudentService.BASE_URL}/student_family").json()['student_family'],
            "performance": requests.get(f"{StudentService.BASE_URL}/performance").json()['performance'],
            "study_habits": requests.get(f"{StudentService.BASE_URL}/study_habits").json()['study_habits'],
            "support": requests.get(f"{StudentService.BASE_URL}/support").json()['support'],
            "social_life": requests.get(f"{StudentService.BASE_URL}/social_life").json()['social_life'],
            "health": requests.get(f"{StudentService.BASE_URL}/health").json()['health'],
            "parent_jobs": requests.get(f"{StudentService.BASE_URL}/parent_job").json()['parent_job'],
            "parent_education": requests.get(f"{StudentService.BASE_URL}/parent_education").json()['parent_education'],
            "reasons": requests.get(f"{StudentService.BASE_URL}/reason").json()['reason'],
            "travel_times": requests.get(f"{StudentService.BASE_URL}/travel_time").json()['travel_time'],
            "study_times": requests.get(f"{StudentService.BASE_URL}/studytime").json()['studytime'],
            "guardians": requests.get(f"{StudentService.BASE_URL}/guardian").json()['guardian'],
        }

        # Indexer les données pour des recherches rapides
        student_family_dict = {sf["student_family_id"]: sf for sf in data["student_families"]}
        performance_dict = {p["performance_id"]: p for p in data["performance"]}
        study_habits_dict = {sh["study_habits_id"]: sh for sh in data["study_habits"]}
        support_dict = {s["support_id"]: s for s in data["support"]}
        social_life_dict = {sl["social_life_id"]: sl for sl in data["social_life"]}
        health_dict = {h["health_id"]: h for h in data["health"]}
        parent_jobs_dict = {pj["job_id"]: pj["job_name"] for pj in data["parent_jobs"]}
        parent_edu_dict = {pe["parent_edu_id"]: pe["parent_edu_level"] for pe in data["parent_education"]}
        reasons_dict = {r["reason_id"]: r["reason"] for r in data["reasons"]}
        travel_time_dict = {tt["travel_id"]: tt["travel_time_range"] for tt in data["travel_times"]}
        study_time_dict = {st["studytime_id"]: st["studytime_range"] for st in data["study_times"]}
        guardians_dict = {g["guardian_id"]: g["guardian_name"] for g in data["guardians"]}

        # Construire les données formatées
        result = []
        for student in data["students"]:
            student_family = student_family_dict.get(student["student_family_id"], {})
            performance = performance_dict.get(student["performance_id"], {})
            study_habits = study_habits_dict.get(student["study_habits_id"], {})
            support = support_dict.get(student["support_id"], {})
            social_life = social_life_dict.get(student["social_life_id"], {})
            health = health_dict.get(student["health_id"], {})

            result.append({
                "school": student["school"],
                "sex": student["sex"],
                "age": student["age"],
                "address": student["address"],
                "famsize": student_family.get("famsize", ""),
                "Pstatus": student_family.get("Pstatus", ""),
                "Medu": parent_edu_dict.get(student_family.get("mother_edu_id"), ""),
                "Fedu": parent_edu_dict.get(student_family.get("father_edu_id"), ""),
                "Mjob": parent_jobs_dict.get(student_family.get("mother_job_id"), ""),
                "Fjob": parent_jobs_dict.get(student_family.get("father_job_id"), ""),
                "reason": reasons_dict.get(support.get("reason_id"), ""),
                "guardian": guardians_dict.get(student_family.get("guardian_id"), ""),
                "traveltime": travel_time_dict.get(study_habits.get("travel_id"), ""),
                "studytime": study_time_dict.get(study_habits.get("studytime_id"), ""),
                "failures_por": performance.get("failures_por", 0),
                "failures_math": performance.get("failures_math", 0),
                "schoolsup": "yes" if support.get("schoolsup") else "no",
                "famsup": "yes" if support.get("famsup") else "no",
                "paid_math": "yes" if support.get("paid_math") else "no",
                "paid_por": "yes" if support.get("paid_por") else "no",
                "activities": "yes" if social_life.get("activities") else "no",
                "nursery": "yes" if support.get("nursery") else "no",
                "higher": "yes" if support.get("higher") else "no",
                "internet": "yes" if support.get("internet") else "no",
                "romantic": "yes" if social_life.get("romantic") else "no",
                "famrel": social_life.get("famrel", 0),
                "freetime": social_life.get("freetime", 0),
                "goout": social_life.get("goout", 0),
                "Dalc": health.get("Dalc", 0),
                "Walc": health.get("Walc", 0),
                "health": health.get("health", 0),
                "absences_por": study_habits.get("absences_por", 0),
                "absences_math": study_habits.get("absences_math", 0),
                "G1_por": performance.get("G1_por", 0),
                "G2_por": performance.get("G2_por", 0),
                "G3_por": performance.get("G3_por", 0),
                "G1_math": performance.get("G1_math", None),
                "G2_math": performance.get("G2_math", None),
                "G3_math": performance.get("G3_math", None),
            })

        return result
