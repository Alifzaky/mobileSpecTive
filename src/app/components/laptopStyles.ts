import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090d16",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#0f172a",
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  headerIndicator: {
    width: 4,
    height: 32,
    backgroundColor: "#38bdf8",
    borderRadius: 2,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f8fafc",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#38bdf8",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
  },
  filterButtonActive: {
    backgroundColor: "#0284c7",
    borderColor: "#38bdf8",
  },
  filterText: {
    fontSize: 13,
    color: "#94a3b8",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffff",
    textTransform: "uppercase",
  },
  specContainer: {
    marginBottom: 12,
    gap: 4,
  },
  cardDetail: {
    fontSize: 13,
    color: "#9ca3af",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#1f2937",
    paddingTop: 10,
  },
  cardPriceLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#38bdf8",
  },
  tipCard: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  tipHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f3f4f6",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "600",
  },
  tipDesc: {
    fontSize: 13,
    color: "#9ca3af",
    lineHeight: 18,
  },
  searchInput: {
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 8,
    padding: 12,
    color: '#ffffff',
    marginBottom: 16,
},
statsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: '#0f172a',
  padding: 10,
  borderRadius: 8,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: '#1e293b',
},
statsText: {
  fontSize: 12,
  color: '#94a3b8',
  fontWeight: '500',
},
emptyText: {
  color: '#94a3b8',
  textAlign: 'center',
  marginVertical: 20,
  fontSize: 14,
}
});
